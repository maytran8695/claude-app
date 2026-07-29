// Pure DOM/text helpers for anchoring user text-selections to persistable
// {quote, prefix, suffix} data, and re-locating/highlighting them later.
// No React, no state — everything here is a plain function over a
// container element (the article's rendered content).

export function getContainerText(container) {
  return container.textContent;
}

// Character offset (relative to container.textContent) of a live Range's
// start boundary. Works regardless of whether the boundary sits on a text
// node or an element node.
export function getTextOffsets(container, range) {
  const preRange = document.createRange();
  preRange.selectNodeContents(container);
  preRange.setEnd(range.startContainer, range.startOffset);
  const start = preRange.toString().length;
  const end = start + range.toString().length;
  return { start, end };
}

// Inverse of getTextOffsets: build a live Range for a stored [start, end)
// character range within container.
export function rangeFromOffsets(container, start, end) {
  const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
  let node;
  let pos = 0;
  let startNode, startOffset, endNode, endOffset;
  while ((node = walker.nextNode())) {
    const len = node.textContent.length;
    if (startNode === undefined && pos + len >= start) {
      startNode = node;
      startOffset = start - pos;
    }
    if (endNode === undefined && pos + len >= end) {
      endNode = node;
      endOffset = end - pos;
    }
    pos += len;
    if (startNode !== undefined && endNode !== undefined) break;
  }
  if (startNode === undefined || endNode === undefined) return null;
  const range = document.createRange();
  range.setStart(startNode, startOffset);
  range.setEnd(endNode, endOffset);
  return range;
}

// TextQuoteSelector-style re-location: find `quote` inside container's
// text, disambiguating repeated occurrences using stored prefix/suffix
// context. Returns { start, end } offsets, or null if not found at all.
export function findQuoteOffsets(container, quote, prefix = "", suffix = "") {
  const text = getContainerText(container);
  const occurrences = [];
  let from = 0;
  while (true) {
    const idx = text.indexOf(quote, from);
    if (idx === -1) break;
    occurrences.push(idx);
    from = idx + 1;
  }
  if (occurrences.length === 0) return null;
  if (occurrences.length === 1) {
    return { start: occurrences[0], end: occurrences[0] + quote.length };
  }
  let best = occurrences[0];
  let bestScore = -1;
  for (const start of occurrences) {
    const end = start + quote.length;
    const actualPrefix = text.slice(Math.max(0, start - prefix.length), start);
    const actualSuffix = text.slice(end, end + suffix.length);
    let score = 0;
    if (prefix && actualPrefix === prefix) score += 2;
    if (suffix && actualSuffix === suffix) score += 2;
    if (score > bestScore) {
      bestScore = score;
      best = start;
    }
  }
  return { start: best, end: best + quote.length };
}

// Wraps a (possibly multi-text-node) Range in one or more <mark> elements,
// splitting boundary text nodes as needed (Range.surroundContents throws
// when a range's boundaries don't cleanly enclose whole nodes, which is
// the common case for arbitrary user selections).
export function wrapRangeInMarks(range, className, attrs = {}) {
  const ancestor =
    range.commonAncestorContainer.nodeType === Node.TEXT_NODE
      ? range.commonAncestorContainer.parentNode
      : range.commonAncestorContainer;

  const walker = document.createTreeWalker(ancestor, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return range.intersectsNode(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  const nodes = [];
  let n;
  while ((n = walker.nextNode())) nodes.push(n);

  const marks = [];
  for (const node of nodes) {
    let start = 0;
    let end = node.textContent.length;
    if (node === range.startContainer) start = range.startOffset;
    if (node === range.endContainer) end = range.endOffset;
    if (start >= end) continue;

    let target = node;
    if (start > 0) target = target.splitText(start);
    if (end - start < target.textContent.length) target.splitText(end - start);

    const mark = document.createElement("mark");
    mark.className = className;
    for (const [k, v] of Object.entries(attrs)) mark.setAttribute(k, v);
    target.parentNode.insertBefore(mark, target);
    mark.appendChild(target);
    marks.push(mark);
  }
  return marks;
}

export function unwrapMark(markEl) {
  const parent = markEl.parentNode;
  if (!parent) return;
  while (markEl.firstChild) parent.insertBefore(markEl.firstChild, markEl);
  parent.removeChild(markEl);
  parent.normalize();
}

function isSectionHeaderLike(el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
  if (["H1", "H2", "H3", "H4"].includes(el.tagName)) return true;
  if (el.tagName === "BUTTON") return true;
  if (el.getAttribute("role") === "button") return true;
  return false;
}

function headerLabel(el) {
  return el.textContent.trim().replace(/\s+/g, " ").slice(0, 120);
}

// Best-effort heuristic for "which collapsible section is this selection
// inside?" — many articles in this app use accordion-style sections whose
// body only exists in the DOM while expanded, so a note's quote can go
// temporarily unlocatable when its section is collapsed. Captured at save
// time so the UI can later show the user where to look, or attempt to
// auto-expand it (see tryExpandSection below). Walks up from the selection
// node, checking each ancestor and that ancestor's preceding siblings for
// the nearest heading- or button-like element (typical accordion toggle).
export function findSectionLabel(container, node) {
  let el = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
  while (el && el !== container && container.contains(el)) {
    if (isSectionHeaderLike(el)) return headerLabel(el);
    let sib = el.previousElementSibling;
    while (sib) {
      if (isSectionHeaderLike(sib)) return headerLabel(sib);
      sib = sib.previousElementSibling;
    }
    el = el.parentElement;
  }
  return null;
}

// Attempts to click whatever heading/button in `container` matches
// `label` (as produced by findSectionLabel), simulating the same action a
// user would take to expand a collapsed accordion section. Returns true
// if a matching, clickable element was found and clicked.
export function tryExpandSection(container, label) {
  if (!label) return false;
  const candidates = container.querySelectorAll('button, [role="button"], h1, h2, h3, h4');
  for (const el of candidates) {
    if (headerLabel(el) === label) {
      el.click();
      return true;
    }
  }
  return false;
}
