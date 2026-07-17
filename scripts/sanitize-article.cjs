#!/usr/bin/env node
/**
 * Sanitize a Claude-Artifact-exported .jsx article before it lands in
 * src/articles/. Fixes the mechanical, always-safe layout conflicts
 * automatically; everything that needs judgment is only reported.
 *
 * Usage:
 *   node scripts/sanitize-article.js <file1.jsx> [file2.jsx ...]        (report only)
 *   node scripts/sanitize-article.js <file1.jsx> [file2.jsx ...] --fix  (report + auto-fix)
 */
const fs = require("fs");
const path = require("path");

const KNOWN_SAFE_VARS = new Set([
  "font-sans", "font-mono", "radius",
  "surface-0", "surface-1", "surface-2",
  "text-primary", "text-secondary", "text-muted",
  "border", "border-strong",
  "color-background-primary", "color-background-secondary",
  "color-text-primary", "color-text-secondary", "color-text-tertiary",
  "color-border-tertiary",
]);

const GLOBAL_FONT_FAMILIES = ["Inter", "Plus\\+Jakarta\\+Sans"];

function fixStickyHeight(src) {
  let changed = false;
  // position:"sticky" (or position: 'sticky') blocks that also pin height:"100vh"
  // -> keep sticky, turn height into maxHeight, make sure overflow-y:auto exists.
  const objBlockRe = /\{[^{}]*position:\s*["']sticky["'][^{}]*\}/g;
  src = src.replace(objBlockRe, (block) => {
    if (!/height:\s*["']100vh["']/.test(block)) return block;
    let next = block.replace(/height:\s*["']100vh["']/, `maxHeight: "100vh"`);
    if (!/overflow-?y:\s*["']auto["']/.test(next)) {
      next = next.replace(/maxHeight:\s*["']100vh["']/, `maxHeight: "100vh", overflowY: "auto"`);
    }
    if (next !== block) changed = true;
    return next;
  });

  // Same idea inside CSS-in-template-literal rules: `.rail{...position:sticky...height:100vh...}`
  // (?<![a-z-]) keeps this from matching inside "max-height"/"min-height"/"line-height".
  const cssBlockRe = /\{[^{}]*position:\s*sticky[^{}]*\}/g;
  src = src.replace(cssBlockRe, (block) => {
    if (!/(?<![a-z-])height:\s*100vh/.test(block)) return block;
    let next = block.replace(/(?<![a-z-])height:\s*100vh/, "max-height:100vh");
    if (!/overflow-y:\s*auto/.test(next)) {
      next = next.replace(/max-height:100vh/, "max-height:100vh;overflow-y:auto");
    }
    if (next !== block) changed = true;
    return next;
  });

  return { src, changed };
}

function stripBareFullViewportHeight(src) {
  let changed = false;
  const patterns = [
    /\s*height:\s*["']100vh["'],?/g,
    /\s*minHeight:\s*["']100vh["'],?/g,
    // (?<![a-z-]) excludes max-height/min-height/line-height in kebab-case CSS
    /\s*(?<![a-z-])height:\s*100vh;?/g,
    /\s*min-height:\s*100vh;?/g,
  ];
  for (const re of patterns) {
    const next = src.replace(re, (m) => {
      changed = true;
      return "";
    });
    src = next;
  }
  return { src, changed };
}

function stripDuplicateGlobalFonts(src) {
  let changed = false;
  const urlRe = /(https:\/\/fonts\.googleapis\.com\/css2\?)([^'")\s]*)/g;
  src = src.replace(urlRe, (full, prefix, query) => {
    let params = query.split("&").filter(Boolean);
    const before = params.length;
    params = params.filter((p) => {
      if (!p.startsWith("family=")) return true;
      return !GLOBAL_FONT_FAMILIES.some((fam) => new RegExp(`^family=${fam}(:|$)`).test(p));
    });
    if (params.length !== before) changed = true;
    if (params.length === 0) return "__REMOVE_IMPORT__";
    return prefix + params.join("&");
  });

  if (src.includes("__REMOVE_IMPORT__")) {
    src = src
      .replace(/^\s*@import url\(['"]__REMOVE_IMPORT__['"]\);?\s*\n?/gm, "")
      .replace(/<link[^>]*href=["']__REMOVE_IMPORT__["'][^>]*\/?>\s*\n?/g, "");
  }
  return { src, changed };
}

function collectWarnings(src, filePath) {
  const warnings = [];
  const lines = src.split("\n");

  lines.forEach((line, i) => {
    const n = i + 1;
    if (/position:\s*["']?fixed["']?/.test(line)) {
      warnings.push(`  L${n}: position:"fixed" found — confirm it's a real overlay/tooltip, not a full-page-assumption nav bar.`);
    }
    if (/className=["'][^"']*max-w-[^"']*mx-auto[^"']*["']/.test(line) || /className=["'][^"']*mx-auto[^"']*max-w-[^"']*["']/.test(line)) {
      warnings.push(`  L${n}: className has both max-w-* and mx-auto — likely a duplicate outer container (shell already centers/constrains width). Review whether to strip it.`);
    }
    const maxWidthNum = line.match(/maxWidth:\s*(\d+)(?!["'])/);
    if (maxWidthNum) {
      warnings.push(`  L${n}: maxWidth:${maxWidthNum[1]} (raw number, no margin:auto nearby) — check if this narrows the root wrapper without centering it (left-aligned mess).`);
    }
  });

  // Vars the file defines itself (e.g. `.root{--acc:${ACC}; ...}` or `--acc:#fff;`)
  // are not "missing" — exclude them from the warning.
  const locallyDefined = new Set();
  const defRe = /--([a-zA-Z0-9-]+)\s*:/g;
  let d;
  while ((d = defRe.exec(src))) locallyDefined.add(d[1]);

  const varRe = /var\(--([a-zA-Z0-9-]+)\)(?!\s*,)/g;
  const unknownVars = new Set();
  let m;
  while ((m = varRe.exec(src))) {
    if (!KNOWN_SAFE_VARS.has(m[1]) && !locallyDefined.has(m[1])) unknownVars.add(m[1]);
  }
  if (unknownVars.size) {
    warnings.push(
      `  var(--x) without fallback, not in index.css token list: ${[...unknownVars].join(", ")}\n` +
      `    → either add a fallback inline (var(--x, #hex)) or add --${[...unknownVars][0]} to .article-content in src/index.css.`
    );
  }

  return warnings;
}

function processFile(filePath, doFix) {
  const original = fs.readFileSync(filePath, "utf8");
  let src = original;
  let anyFixed = false;

  const r1 = fixStickyHeight(src);
  src = r1.src;
  const r2 = stripBareFullViewportHeight(src);
  src = r2.src;
  const r3 = stripDuplicateGlobalFonts(src);
  src = r3.src;
  anyFixed = r1.changed || r2.changed || r3.changed;

  const warnings = collectWarnings(src, filePath);

  console.log(`\n${path.relative(process.cwd(), filePath)}`);
  if (r1.changed) console.log("  ✔ fixed: sticky panel height:100vh -> maxHeight:100vh (+overflow-y:auto)");
  if (r2.changed) console.log("  ✔ fixed: stripped stray height/minHeight:100vh");
  if (r3.changed) console.log("  ✔ fixed: removed duplicate global font (Inter / Plus Jakarta Sans) from font import");
  if (!anyFixed) console.log("  (no mechanical fixes needed)");

  if (warnings.length) {
    console.log("  ⚠ needs manual review:");
    warnings.forEach((w) => console.log(w));
  }

  if (doFix && anyFixed) {
    fs.writeFileSync(filePath, src, "utf8");
    console.log("  → written");
  } else if (doFix && !anyFixed) {
    // nothing to write
  } else if (!doFix && anyFixed) {
    console.log("  (run again with --fix to apply)");
  }

  return { warnings: warnings.length, fixed: anyFixed };
}

function main() {
  const args = process.argv.slice(2);
  const doFix = args.includes("--fix");
  const files = args.filter((a) => a !== "--fix");

  if (files.length === 0) {
    console.error("Usage: node scripts/sanitize-article.js <file.jsx> [...] [--fix]");
    process.exit(1);
  }

  let totalWarnings = 0;
  for (const f of files) {
    const abs = path.resolve(f);
    if (!fs.existsSync(abs)) {
      console.error(`\n${f}\n  ✗ file not found`);
      continue;
    }
    const { warnings } = processFile(abs, doFix);
    totalWarnings += warnings;
  }

  console.log("");
  if (totalWarnings > 0) {
    console.log(`${totalWarnings} item(s) need manual review (see above).`);
  } else {
    console.log("Clean — no manual-review items found.");
  }
}

main();
