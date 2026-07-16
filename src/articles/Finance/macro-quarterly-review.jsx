import { useState, useEffect } from "react";

// ══════════════════════════════════════════════════════════
// INPUT SCHEMA — các chỉ báo cần điền mỗi quý
// Mỗi field là segmented control (dễ bấm trên mobile)
// ══════════════════════════════════════════════════════════

const INPUT_GROUPS = [
  {
    id: "growth",
    title: "Tăng trưởng (Growth)",
    color: "#dc2626",
    bg: "#fef2f2",
    fields: [
      { id: "pmi", label: "PMI sản xuất", hint: "S&P Global VN, đầu tháng", options: [
        { v: "below48", l: "< 48 (co mạnh)", score: -2 },
        { v: "48to50", l: "48–50 (co nhẹ)", score: -1 },
        { v: "50to52", l: "50–52 (mở rộng nhẹ)", score: 1 },
        { v: "above52", l: "> 52 (mở rộng mạnh)", score: 2 },
      ]},
      { id: "pmiDir", label: "PMI xu hướng 3 tháng", hint: "đang tăng hay giảm", options: [
        { v: "rising", l: "Đang tăng", score: 1 },
        { v: "flat", l: "Đi ngang", score: 0 },
        { v: "falling", l: "Đang giảm", score: -1 },
      ]},
      { id: "gdp", label: "GDP YoY quý gần nhất", hint: "GSO", options: [
        { v: "below4", l: "< 4%", score: -2 },
        { v: "4to6", l: "4–6%", score: 0 },
        { v: "6to7", l: "6–7%", score: 1 },
        { v: "above7", l: "> 7%", score: 2 },
      ]},
      { id: "export", label: "Xuất khẩu YoY", hint: "Hải quan", options: [
        { v: "falling", l: "Giảm", score: -1 },
        { v: "flat", l: "Đi ngang", score: 0 },
        { v: "rising", l: "Tăng", score: 1 },
      ]},
      { id: "retail", label: "Bán lẻ / tiêu dùng", hint: "GSO tổng mức bán lẻ", options: [
        { v: "weak", l: "Yếu", score: -1 },
        { v: "moderate", l: "Ổn định", score: 0 },
        { v: "strong", l: "Mạnh", score: 1 },
      ]},
    ],
  },
  {
    id: "inflation",
    title: "Lạm phát (Inflation)",
    color: "#f59e0b",
    bg: "#fffbeb",
    fields: [
      { id: "cpi", label: "CPI tổng thể YoY", hint: "GSO, ngày 29", options: [
        { v: "below2", l: "< 2%", score: -1 },
        { v: "2to3.5", l: "2–3.5%", score: 0 },
        { v: "3.5to4.5", l: "3.5–4.5%", score: 1 },
        { v: "above4.5", l: "> 4.5%", score: 2 },
      ]},
      { id: "cpiCore", label: "CPI lõi xu hướng", hint: "loại thực phẩm+năng lượng", options: [
        { v: "falling", l: "Đang giảm", score: -1 },
        { v: "flat", l: "Đi ngang", score: 0 },
        { v: "rising", l: "Đang tăng", score: 1 },
      ]},
      { id: "oil", label: "Giá dầu / hàng hoá TG", hint: "Brent, commodity index", options: [
        { v: "falling", l: "Đang giảm", score: -1 },
        { v: "flat", l: "Ổn định", score: 0 },
        { v: "rising", l: "Đang tăng", score: 1 },
      ]},
    ],
  },
  {
    id: "liquidity",
    title: "Thanh khoản & Lãi suất",
    color: "#16a34a",
    bg: "#f0fdf4",
    fields: [
      { id: "credit", label: "Tăng trưởng tín dụng YoY", hint: "SBV", options: [
        { v: "below10", l: "< 10% (chậm)", score: -1 },
        { v: "10to14", l: "10–14%", score: 0 },
        { v: "14to18", l: "14–18%", score: 1 },
        { v: "above18", l: "> 18% (nóng)", score: 2 },
      ]},
      { id: "creditImpulse", label: "Credit Impulse", hint: "tốc độ thay đổi tín dụng", options: [
        { v: "contract", l: "Co rút (âm)", score: -2 },
        { v: "decel", l: "Giảm tốc", score: -1 },
        { v: "peak", l: "Đạt đỉnh", score: 0 },
        { v: "accel", l: "Tăng tốc", score: 2 },
      ]},
      { id: "vnibor", label: "VNIBOR qua đêm", hint: "nhiệt kế thanh khoản", options: [
        { v: "below1.5", l: "< 1.5% (dư thừa)", score: 2 },
        { v: "1.5to3", l: "1.5–3% (bình thường)", score: 1 },
        { v: "3to4", l: "3–4% (hơi căng)", score: -1 },
        { v: "above4", l: "> 4% (căng thẳng)", score: -2 },
      ]},
      { id: "deposit", label: "Lãi suất tiết kiệm 12M", hint: "Big 4 + tư nhân lớn", options: [
        { v: "falling", l: "Đang giảm", score: 1 },
        { v: "flat", l: "Ổn định", score: 0 },
        { v: "rising", l: "Đang tăng", score: -1 },
      ]},
      { id: "bond10y", label: "Lợi suất TPCP 10Y", hint: "HNX", options: [
        { v: "falling", l: "Đang giảm", score: 1 },
        { v: "flat", l: "Ổn định", score: 0 },
        { v: "rising", l: "Đang tăng", score: -1 },
      ]},
      { id: "sbvStance", label: "Định hướng SBV", hint: "OMO, phát ngôn, policy rate", options: [
        { v: "easing", l: "Nới lỏng", score: 2 },
        { v: "neutral", l: "Trung lập", score: 0 },
        { v: "tightening", l: "Thắt chặt", score: -2 },
      ]},
    ],
  },
  {
    id: "external",
    title: "Tỷ giá & Bên ngoài",
    color: "#7c3aed",
    bg: "#faf5ff",
    fields: [
      { id: "fx", label: "USD/VND xu hướng", hint: "so với đầu năm", options: [
        { v: "appreciate", l: "VND tăng giá", score: 1 },
        { v: "stable", l: "Ổn định (±2%)", score: 1 },
        { v: "mildDep", l: "Mất giá nhẹ (2–4%)", score: -1 },
        { v: "strongDep", l: "Mất giá mạnh (>4%)", score: -2 },
      ]},
      { id: "reserves", label: "Dự trữ ngoại hối", hint: "tháng nhập khẩu", options: [
        { v: "above3.5", l: "> 3.5 tháng (an toàn)", score: 1 },
        { v: "3to3.5", l: "3–3.5 tháng", score: 0 },
        { v: "below3", l: "< 3 tháng (rủi ro)", score: -2 },
      ]},
      { id: "dxy", label: "DXY (USD Index)", hint: "sức mạnh USD toàn cầu", options: [
        { v: "falling", l: "Đang yếu đi", score: 1 },
        { v: "flat", l: "Đi ngang", score: 0 },
        { v: "rising", l: "Đang mạnh lên", score: -1 },
      ]},
      { id: "fed", label: "Định hướng Fed", hint: "FOMC, dot plot", options: [
        { v: "cutting", l: "Đang cắt giảm", score: 2 },
        { v: "hold", l: "Giữ nguyên", score: 0 },
        { v: "hiking", l: "Đang tăng", score: -2 },
      ]},
      { id: "foreign", label: "Khối ngoại (FII)", hint: "mua/bán ròng HOSE", options: [
        { v: "buying", l: "Mua ròng", score: 1 },
        { v: "neutral", l: "Cân bằng", score: 0 },
        { v: "selling", l: "Bán ròng", score: -1 },
      ]},
    ],
  },
  {
    id: "valuation",
    title: "Định giá & Reflexivity",
    color: "#0891b2",
    bg: "#f0fdff",
    fields: [
      { id: "pe", label: "P/E VN-Index", hint: "SSI/VCSC Research", options: [
        { v: "below11", l: "< 11x (rẻ)", score: 2 },
        { v: "11to14", l: "11–14x (hợp lý)", score: 1 },
        { v: "14to17", l: "14–17x (đắt dần)", score: -1 },
        { v: "above17", l: "> 17x (đắt)", score: -2 },
      ]},
      { id: "margin", label: "Dư nợ margin / vốn hoá", hint: "báo cáo CTCK", options: [
        { v: "low", l: "Thấp (< 2%)", score: 1 },
        { v: "moderate", l: "Vừa (2–4%)", score: 0 },
        { v: "high", l: "Cao (> 4%)", score: -2 },
      ]},
      { id: "sentiment", label: "Tâm lý thị trường", hint: "retail, FOMO, narrative", options: [
        { v: "fear", l: "Sợ hãi / bi quan", score: 2 },
        { v: "neutral", l: "Trung tính", score: 0 },
        { v: "greed", l: "Tham lam / hưng phấn", score: -2 },
      ]},
    ],
  },
];

// ══════════════════════════════════════════════════════════
// ENGINE — logic tính toán từ input
// ══════════════════════════════════════════════════════════

function calcScore(data, group, fields) {
  let sum = 0, count = 0;
  fields.forEach(f => {
    const val = data[f.id];
    if (val) {
      const opt = f.options.find(o => o.v === val);
      if (opt) { sum += opt.score; count++; }
    }
  });
  return { sum, count };
}

function getGrowthInflation(data) {
  const growthFields = INPUT_GROUPS.find(g => g.id === "growth").fields;
  const inflFields = INPUT_GROUPS.find(g => g.id === "inflation").fields;
  const g = calcScore(data, "growth", growthFields);
  const i = calcScore(data, "inflation", inflFields);
  return {
    growthScore: g.sum,
    growthFilled: g.count,
    inflScore: i.sum,
    inflFilled: i.count,
  };
}

function getRegime(data) {
  const { growthScore, growthFilled, inflScore, inflFilled } = getGrowthInflation(data);
  if (growthFilled === 0 || inflFilled === 0) return null;
  const growthUp = growthScore >= 0;
  const inflHigh = inflScore >= 1;

  if (growthUp && !inflHigh) return {
    id: "recovery", label: "PHỤC HỒI / GOLDILOCKS", en: "Recovery",
    color: "#22c55e", bg: "#f0fdf4", border: "#86efac",
    growth: "Tăng", inflation: "Thấp",
    desc: "Môi trường lý tưởng nhất. Tăng trưởng cải thiện trong khi lạm phát được kiểm soát. SBV có dư địa giữ lãi suất thấp.",
    playbook: "Max tỷ trọng cổ phiếu, đặc biệt cyclicals và financials. Giảm tiền mặt và TPCP dài hạn.",
  };
  if (growthUp && inflHigh) return {
    id: "expansion", label: "MỞ RỘNG / NÓNG", en: "Inflationary Boom",
    color: "#3b82f6", bg: "#eff6ff", border: "#93c5fd",
    growth: "Cao", inflation: "Tăng",
    desc: "Kinh tế nóng. Tăng trưởng mạnh nhưng lạm phát bắt đầu tăng. SBV sắp hoặc đang thắt chặt để kiểm soát.",
    playbook: "Chọn lọc cổ phiếu, ưu tiên value/cyclicals. Tăng hàng hoá & vàng. Tránh TPCP dài hạn và cổ phiếu định giá cao.",
  };
  if (!growthUp && inflHigh) return {
    id: "stagflation", label: "ĐÌNH LẠM", en: "Stagflation",
    color: "#ef4444", bg: "#fef2f2", border: "#fca5a5",
    growth: "Giảm", inflation: "Cao",
    desc: "Regime tệ nhất cho đầu tư. Tăng trưởng yếu nhưng lạm phát vẫn cao. SBV bị kẹt — không thể nới lỏng cũng khó thắt chặt.",
    playbook: "Ưu tiên bảo toàn vốn. Tăng vàng, hàng hoá, tiền mặt (USD). Giảm mạnh cổ phiếu và TPCP.",
  };
  return {
    id: "recession", label: "SUY GIẢM / GIẢM PHÁT", en: "Slowdown/Recession",
    color: "#f59e0b", bg: "#fffbeb", border: "#fcd34d",
    growth: "Giảm", inflation: "Thấp",
    desc: "Tăng trưởng yếu và lạm phát giảm. SBV có thể bắt đầu cắt giảm lãi suất mạnh để kích thích. Đáy chu kỳ đang hình thành.",
    playbook: "TPCP dài hạn là ngôi sao (yield giảm → giá tăng). Vàng phòng thủ. Bắt đầu tích luỹ cổ phiếu chất lượng ở cuối pha.",
  };
}

// 5 ràng buộc lãi suất → đếm số "căng"
function getConstraints(data) {
  const c = [];
  // 1. Lạm phát
  const cpiTight = data.cpi === "above4.5" || data.cpi === "3.5to4.5" || data.cpiCore === "rising";
  c.push({ label: "Lạm phát", tight: cpiTight, detail: cpiTight ? "CPI/lõi đang cao hoặc tăng → hạn chế nới lỏng" : "Lạm phát trong tầm kiểm soát → có dư địa" });
  // 2. Tỷ giá
  const fxTight = data.fx === "mildDep" || data.fx === "strongDep" || data.reserves === "below3";
  c.push({ label: "Tỷ giá & Dự trữ", tight: fxTight, detail: fxTight ? "VND áp lực / dự trữ mỏng → SBV phải giữ lãi suất" : "Tỷ giá ổn định, dự trữ đủ → linh hoạt" });
  // 3. Fed / bên ngoài
  const fedTight = data.fed === "hiking" || data.dxy === "rising";
  c.push({ label: "Fed / DXY", tight: fedTight, detail: fedTight ? "Fed tăng / USD mạnh → VN khó hạ đơn độc" : "Fed hold/cắt, USD yếu → VN có thể hạ trước" });
  // 4. Tín dụng/GDP
  const creditTight = data.credit === "above18";
  c.push({ label: "Tín dụng nóng", tight: creditTight, detail: creditTight ? "Tín dụng tăng quá nhanh → rủi ro hệ thống, khó bơm thêm" : "Tín dụng còn room mở rộng" });
  // 5. Thanh khoản hệ thống
  const liqTight = data.vnibor === "above4" || data.vnibor === "3to4" || data.deposit === "rising";
  c.push({ label: "Thanh khoản", tight: liqTight, detail: liqTight ? "VNIBOR cao / lãi tiết kiệm tăng → hệ thống đang căng" : "Thanh khoản dồi dào" });

  const tightCount = c.filter(x => x.tight).length;
  return { list: c, tightCount };
}

// Reflexivity / mania check
function getReflexivity(data) {
  let maniaScore = 0;
  if (data.pe === "above17") maniaScore += 2;
  else if (data.pe === "14to17") maniaScore += 1;
  if (data.margin === "high") maniaScore += 2;
  if (data.sentiment === "greed") maniaScore += 2;

  let bustScore = 0;
  if (data.pe === "below11") bustScore += 2;
  if (data.margin === "low") bustScore += 1;
  if (data.sentiment === "fear") bustScore += 2;

  if (maniaScore >= 4) return { phase: "mania", label: "MANIA — Cẩn thận đỉnh", color: "#dc2626", bg: "#fef2f2",
    text: "Định giá cao + đòn bẩy lớn + tâm lý hưng phấn. Giảm vị thế dần, không tăng thêm. Tìm trigger có thể gây đảo chiều." };
  if (bustScore >= 4) return { phase: "bottom", label: "BUST/ĐÁY — Cơ hội tích luỹ", color: "#16a34a", bg: "#f0fdf4",
    text: "Định giá rẻ + đòn bẩy đã giải phóng + tâm lý sợ hãi. Bắt đầu tích luỹ theo từng phần (DCA), đừng cố bắt đáy chính xác." };
  return { phase: "neutral", label: "TRUNG TÍNH", color: "#64748b", bg: "#f8fafc",
    text: "Chưa có tín hiệu cực đoan về định giá hay tâm lý. Theo regime và constraints để quyết định." };
}

// Asset allocation engine
const ASSETS = [
  { id: "equity", label: "Cổ phiếu VN", },
  { id: "longbond", label: "TPCP dài hạn" },
  { id: "cash", label: "Tiền mặt / TGNH" },
  { id: "gold", label: "Vàng" },
  { id: "realestate", label: "Bất động sản" },
  { id: "commodity", label: "Hàng hoá / CP xuất khẩu" },
];

function getAllocation(data, regime, constraints, reflex) {
  if (!regime) return null;
  // base score per asset by regime
  const base = {
    recovery:    { equity: 2, longbond: 0, cash: -1, gold: 0, realestate: 2, commodity: 1 },
    expansion:   { equity: 1, longbond: -2, cash: 0, gold: 1, realestate: 1, commodity: 2 },
    stagflation: { equity: -2, longbond: -1, cash: 1, gold: 2, realestate: -1, commodity: 2 },
    recession:   { equity: 0, longbond: 2, cash: 1, gold: 2, realestate: -1, commodity: -1 },
  };
  const scores = { ...base[regime.id] };

  // Adjust: constraints tight → penalize rate-sensitive
  if (constraints.tightCount >= 3) {
    scores.longbond -= 1;
    scores.realestate -= 1;
    scores.equity -= 1;
    scores.cash += 1;
  } else if (constraints.tightCount <= 1) {
    scores.longbond += 1;
    scores.equity += 1;
  }

  // Adjust: credit impulse
  if (data.creditImpulse === "accel") { scores.equity += 1; scores.realestate += 1; }
  if (data.creditImpulse === "contract") { scores.equity -= 1; scores.cash += 1; scores.gold += 1; }

  // Adjust: reflexivity
  if (reflex.phase === "mania") { scores.equity -= 2; scores.realestate -= 1; scores.cash += 1; }
  if (reflex.phase === "bottom") { scores.equity += 2; }

  // Adjust: FX stress → gold/USD
  if (data.fx === "strongDep" || data.reserves === "below3") { scores.gold += 1; scores.longbond -= 1; }

  // map score → OW/N/UW
  const toRating = (s) => {
    if (s >= 2) return { r: "OW", action: "Tăng tỷ trọng", color: "#16a34a", bg: "#f0fdf4" };
    if (s <= -2) return { r: "UW", action: "Giảm tỷ trọng", color: "#dc2626", bg: "#fef2f2" };
    return { r: "N", action: "Trung lập", color: "#64748b", bg: "#f8fafc" };
  };

  return ASSETS.map(a => ({ ...a, score: scores[a.id], ...toRating(scores[a.id]) }))
    .sort((x, y) => y.score - x.score);
}

function getCompleteness(data) {
  const total = INPUT_GROUPS.reduce((s, g) => s + g.fields.length, 0);
  const filled = INPUT_GROUPS.reduce((s, g) => s + g.fields.filter(f => data[f.id]).length, 0);
  return { filled, total, pct: Math.round((filled / total) * 100) };
}

// ══════════════════════════════════════════════════════════
// UI COMPONENTS
// ══════════════════════════════════════════════════════════

function Segmented({ field, value, onChange, color }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 5 }}>
        <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b" }}>{field.label}</span>
        <span style={{ fontSize: 9.5, color: "#94a3b8" }}>{field.hint}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {field.options.map(o => {
          const active = value === o.v;
          return (
            <button key={o.v} onClick={() => onChange(field.id, o.v)} style={{
              flex: "1 1 auto", minWidth: 0,
              padding: "6px 8px", borderRadius: 8, cursor: "pointer",
              fontSize: 11, fontWeight: active ? 700 : 500,
              border: `1.5px solid ${active ? color : "#e2e8f0"}`,
              background: active ? color : "#fff",
              color: active ? "#fff" : "#475569",
              transition: "all 0.12s", whiteSpace: "nowrap",
            }}>{o.l}</button>
          );
        })}
      </div>
    </div>
  );
}

function GaugeBar({ value, min, max, color, labels }) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  return (
    <div>
      <div style={{ position: "relative", height: 10, background: "#e2e8f0", borderRadius: 6, marginBottom: 4 }}>
        <div style={{ position: "absolute", left: "50%", top: -2, width: 1, height: 14, background: "#94a3b8" }} />
        <div style={{ position: "absolute", left: `${pct}%`, top: -3, transform: "translateX(-50%)", width: 14, height: 14, borderRadius: "50%", background: color, border: "2px solid #fff", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: "#94a3b8" }}>
        <span>{labels[0]}</span><span>{labels[1]}</span>
      </div>
    </div>
  );
}

export default function MacroQuarterlyReview() {
  const [quarter, setQuarter] = useState("2026-Q1");
  const [data, setData] = useState({});
  const [snapshots, setSnapshots] = useState({});
  const [notes, setNotes] = useState("");
  const [view, setView] = useState("input"); // input | result | history
  const [loaded, setLoaded] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  // Load all snapshots on mount
  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("macro-quarterly-all");
        if (res && res.value) {
          const parsed = JSON.parse(res.value);
          setSnapshots(parsed);
          // load latest quarter into current
          const keys = Object.keys(parsed).sort();
          if (keys.length) {
            const last = keys[keys.length - 1];
            setQuarter(last);
            setData(parsed[last].data || {});
            setNotes(parsed[last].notes || "");
          }
        }
      } catch (e) {
        // no data yet
      }
      setLoaded(true);
    })();
  }, []);

  const update = (field, value) => setData(d => ({ ...d, [field]: value }));

  const save = async () => {
    const newSnapshots = { ...snapshots, [quarter]: { data, notes, savedAt: new Date().toISOString() } };
    setSnapshots(newSnapshots);
    try {
      await window.storage.set("macro-quarterly-all", JSON.stringify(newSnapshots));
      setSaveMsg("✓ Đã lưu " + quarter);
      setTimeout(() => setSaveMsg(""), 2500);
    } catch (e) {
      setSaveMsg("✗ Lỗi lưu");
      setTimeout(() => setSaveMsg(""), 2500);
    }
  };

  const loadQuarter = (q) => {
    setQuarter(q);
    setData(snapshots[q]?.data || {});
    setNotes(snapshots[q]?.notes || "");
    setView("input");
  };

  const newQuarter = () => {
    setData({});
    setNotes("");
    setView("input");
  };

  const regime = getRegime(data);
  const constraints = getConstraints(data);
  const reflex = getReflexivity(data);
  const allocation = getAllocation(data, regime, constraints, reflex);
  const completeness = getCompleteness(data);
  const gi = getGrowthInflation(data);

  if (!loaded) {
    return <div style={{ padding: 40, textAlign: "center", fontFamily: "'IBM Plex Sans', sans-serif", color: "#94a3b8" }}>Đang tải...</div>;
  }

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', 'Segoe UI', sans-serif", background: "#f1f5f9", padding: "18px 14px 40px", color: "#1e293b" }}>
      {/* Header */}
      <div style={{ background: "#0f172a", borderRadius: 16, padding: "16px 18px", marginBottom: 14 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 3, color: "#64748b", textTransform: "uppercase" }}>Macro Review — Thực chiến</div>
        <h1 style={{ fontSize: 19, fontWeight: 900, margin: "4px 0 8px", color: "#f8fafc", lineHeight: 1.2 }}>Phân tích vĩ mô định kỳ</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            value={quarter}
            onChange={e => setQuarter(e.target.value)}
            placeholder="2026-Q1"
            style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "6px 10px", color: "#f8fafc", fontSize: 13, fontWeight: 700, width: 110, fontFamily: "inherit" }}
          />
          <button onClick={save} style={{ background: "#22c55e", border: "none", borderRadius: 8, padding: "7px 14px", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>Lưu</button>
          <button onClick={newQuarter} style={{ background: "#334155", border: "none", borderRadius: 8, padding: "7px 12px", color: "#cbd5e1", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>+ Mới</button>
          {saveMsg && <span style={{ fontSize: 11, color: saveMsg.startsWith("✓") ? "#4ade80" : "#f87171", fontWeight: 600 }}>{saveMsg}</span>}
        </div>
      </div>

      {/* View tabs */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[{ id: "input", l: "① Nhập số liệu" }, { id: "result", l: "② Kết quả" }, { id: "history", l: "③ Lịch sử" }].map(t => (
          <button key={t.id} onClick={() => setView(t.id)} style={{
            flex: 1, padding: "9px 4px", borderRadius: 10, cursor: "pointer",
            fontSize: 12, fontWeight: view === t.id ? 700 : 500,
            background: view === t.id ? "#0f172a" : "#fff",
            color: view === t.id ? "#fff" : "#64748b",
            border: `1.5px solid ${view === t.id ? "#0f172a" : "#e2e8f0"}`,
          }}>{t.l}</button>
        ))}
      </div>

      {/* Completeness bar */}
      {view === "input" && (
        <div style={{ background: "#fff", borderRadius: 10, padding: "10px 12px", marginBottom: 14, border: "1px solid #e2e8f0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 5 }}>
            <span style={{ color: "#64748b" }}>Đã điền {completeness.filled}/{completeness.total} chỉ báo</span>
            <span style={{ fontWeight: 700, color: completeness.pct === 100 ? "#16a34a" : "#f59e0b" }}>{completeness.pct}%</span>
          </div>
          <div style={{ height: 6, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${completeness.pct}%`, background: completeness.pct === 100 ? "#16a34a" : "#f59e0b", transition: "width 0.3s" }} />
          </div>
        </div>
      )}

      {/* ═══ INPUT VIEW ═══ */}
      {view === "input" && (
        <div>
          {INPUT_GROUPS.map(g => (
            <div key={g.id} style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 12, border: `1.5px solid ${g.color}30` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <div style={{ width: 4, height: 18, borderRadius: 2, background: g.color }} />
                <span style={{ fontSize: 14, fontWeight: 800, color: g.color }}>{g.title}</span>
              </div>
              {g.fields.map(f => (
                <Segmented key={f.id} field={f} value={data[f.id]} onChange={update} color={g.color} />
              ))}
            </div>
          ))}

          {/* Notes */}
          <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 12, border: "1.5px solid #e2e8f0" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", marginBottom: 8 }}>📝 Ghi chú quý này</div>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Sự kiện nổi bật, thay đổi chính sách, quan sát riêng, luận điểm đầu tư..."
              rows={4}
              style={{ width: "100%", boxSizing: "border-box", border: "1px solid #e2e8f0", borderRadius: 8, padding: "10px", fontSize: 13, fontFamily: "inherit", color: "#374151", resize: "vertical" }}
            />
          </div>

          <button onClick={() => setView("result")} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: "#0f172a", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            Xem kết quả phân tích →
          </button>
        </div>
      )}

      {/* ═══ RESULT VIEW ═══ */}
      {view === "result" && (
        <div>
          {!regime ? (
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, textAlign: "center", border: "1.5px solid #e2e8f0" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📊</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>Chưa đủ dữ liệu</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>Cần điền ít nhất phần Tăng trưởng và Lạm phát để xác định regime.</div>
              <button onClick={() => setView("input")} style={{ padding: "10px 20px", borderRadius: 10, border: "none", background: "#0f172a", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>← Quay lại nhập</button>
            </div>
          ) : (
            <>
              {/* Regime card */}
              <div style={{ background: regime.bg, borderRadius: 14, padding: "16px 18px", marginBottom: 12, border: `2px solid ${regime.border}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: regime.color, textTransform: "uppercase", marginBottom: 4 }}>Macro Regime hiện tại</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: regime.color, marginBottom: 2 }}>{regime.label}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginBottom: 10 }}>{regime.en} · Tăng trưởng {regime.growth} × Lạm phát {regime.inflation}</div>
                <p style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.6, margin: "0 0 12px" }}>{regime.desc}</p>

                {/* Growth / Inflation gauges */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div style={{ background: "#fff", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#dc2626", marginBottom: 6 }}>TĂNG TRƯỞNG</div>
                    <GaugeBar value={gi.growthScore} min={-6} max={6} color="#dc2626" labels={["Yếu", "Mạnh"]} />
                  </div>
                  <div style={{ background: "#fff", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#f59e0b", marginBottom: 6 }}>LẠM PHÁT</div>
                    <GaugeBar value={gi.inflScore} min={-3} max={4} color="#f59e0b" labels={["Thấp", "Cao"]} />
                  </div>
                </div>

                <div style={{ background: "#fff", borderRadius: 10, padding: "10px 12px", borderLeft: `3px solid ${regime.color}` }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: regime.color, marginBottom: 3 }}>PLAYBOOK</div>
                  <div style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.55 }}>{regime.playbook}</div>
                </div>
              </div>

              {/* Constraints scorecard */}
              <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 12, border: "1.5px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color: "#1e293b" }}>5 Ràng buộc lãi suất</span>
                  <span style={{ fontSize: 12, fontWeight: 800, padding: "3px 10px", borderRadius: 20, background: constraints.tightCount >= 3 ? "#fef2f2" : "#f0fdf4", color: constraints.tightCount >= 3 ? "#dc2626" : "#16a34a" }}>
                    {constraints.tightCount}/5 căng
                  </span>
                </div>
                {constraints.list.map((c, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "7px 0", borderBottom: i < 4 ? "1px solid #f1f5f9" : "none" }}>
                    <div style={{ width: 44, flexShrink: 0, fontSize: 9.5, fontWeight: 800, padding: "3px 0", borderRadius: 6, textAlign: "center", background: c.tight ? "#fef2f2" : "#f0fdf4", color: c.tight ? "#dc2626" : "#16a34a" }}>
                      {c.tight ? "CĂNG" : "OK"}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1e293b" }}>{c.label}</div>
                      <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.45 }}>{c.detail}</div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 10, padding: "8px 10px", borderRadius: 8, background: constraints.tightCount >= 3 ? "#fef2f2" : "#f0fdf4", fontSize: 11.5, color: constraints.tightCount >= 3 ? "#991b1b" : "#166534", lineHeight: 1.5 }}>
                  {constraints.tightCount >= 3
                    ? "⚠️ ≥3 ràng buộc căng → SBV khó nới lỏng dù kinh tế yếu. Tránh tài sản nhạy lãi suất dài hạn."
                    : "✓ Ít ràng buộc → SBV có dư địa hạ lãi suất. Môi trường thuận lợi cho tài sản rủi ro."}
                </div>
              </div>

              {/* Reflexivity */}
              <div style={{ background: reflex.bg, borderRadius: 14, padding: "14px 16px", marginBottom: 12, border: `1.5px solid ${reflex.color}40` }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: reflex.color, textTransform: "uppercase", marginBottom: 3 }}>Reflexivity / Định giá</div>
                <div style={{ fontSize: 15, fontWeight: 800, color: reflex.color, marginBottom: 5 }}>{reflex.label}</div>
                <div style={{ fontSize: 12.5, color: "#374151", lineHeight: 1.55 }}>{reflex.text}</div>
              </div>

              {/* Allocation */}
              <div style={{ background: "#fff", borderRadius: 14, padding: "14px 16px", marginBottom: 12, border: "1.5px solid #e2e8f0" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: "#1e293b", marginBottom: 4 }}>Gợi ý phân bổ tài sản</div>
                <div style={{ fontSize: 10.5, color: "#94a3b8", marginBottom: 12 }}>Tổng hợp từ regime + ràng buộc + credit impulse + reflexivity</div>
                {allocation.map(a => (
                  <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #f1f5f9" }}>
                    <div style={{ width: 38, flexShrink: 0, fontSize: 11, fontWeight: 800, padding: "4px 0", borderRadius: 6, textAlign: "center", background: a.bg, color: a.color }}>{a.r}</div>
                    <div style={{ flex: 1, fontSize: 13, fontWeight: 600, color: "#1e293b" }}>{a.label}</div>
                    <div style={{ fontSize: 10.5, fontWeight: 600, color: a.color, width: 58, textAlign: "right", flexShrink: 0 }}>{a.action}</div>
                    {/* score position bar */}
                    <div style={{ width: 44, flexShrink: 0, display: "flex", justifyContent: "center" }}>
                      <div style={{ width: 40, height: 6, background: "#e2e8f0", borderRadius: 4, position: "relative" }}>
                        <div style={{ position: "absolute", left: "50%", top: -1, width: 1, height: 8, background: "#cbd5e1" }} />
                        <div style={{ position: "absolute", left: `${Math.max(0, Math.min(100, (a.score + 4) / 8 * 100))}%`, top: -2, transform: "translateX(-50%)", width: 8, height: 8, borderRadius: "50%", background: a.color }} />
                      </div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: 10, fontSize: 10, color: "#94a3b8", lineHeight: 1.5 }}>
                  OW = Overweight (tăng tỷ trọng) · N = Neutral · UW = Underweight (giảm). Đây là khung tham khảo, không phải khuyến nghị đầu tư — luôn kết hợp phân tích cơ bản từng cổ phiếu và khẩu vị rủi ro cá nhân.
                </div>
              </div>

              {notes && (
                <div style={{ background: "#fffbeb", borderRadius: 14, padding: "14px 16px", marginBottom: 12, border: "1.5px solid #fcd34d" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "#92400e", marginBottom: 5 }}>📝 Ghi chú của bạn</div>
                  <div style={{ fontSize: 12.5, color: "#78350f", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{notes}</div>
                </div>
              )}

              <button onClick={save} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "none", background: "#22c55e", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                💾 Lưu snapshot {quarter}
              </button>
            </>
          )}
        </div>
      )}

      {/* ═══ HISTORY VIEW ═══ */}
      {view === "history" && (
        <div>
          {Object.keys(snapshots).length === 0 ? (
            <div style={{ background: "#fff", borderRadius: 14, padding: 24, textAlign: "center", border: "1.5px solid #e2e8f0" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📅</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>Chưa có lịch sử</div>
              <div style={{ fontSize: 12, color: "#64748b" }}>Điền số liệu và bấm Lưu để bắt đầu theo dõi qua các quý.</div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>So sánh regime qua các kỳ. Bấm để mở lại.</div>
              {Object.keys(snapshots).sort().reverse().map(q => {
                const snap = snapshots[q];
                const r = getRegime(snap.data);
                return (
                  <button key={q} onClick={() => loadQuarter(q)} style={{
                    width: "100%", textAlign: "left", cursor: "pointer",
                    background: "#fff", borderRadius: 12, padding: "12px 14px", marginBottom: 8,
                    border: `1.5px solid ${r ? r.border : "#e2e8f0"}`,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                  }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: "#1e293b" }}>{q}</div>
                      {r ? (
                        <div style={{ fontSize: 11, fontWeight: 700, color: r.color, marginTop: 2 }}>{r.label}</div>
                      ) : (
                        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>Chưa đủ dữ liệu</div>
                      )}
                      {snap.savedAt && <div style={{ fontSize: 9.5, color: "#cbd5e1", marginTop: 2 }}>Lưu: {new Date(snap.savedAt).toLocaleDateString("vi-VN")}</div>}
                    </div>
                    {r && <div style={{ width: 12, height: 12, borderRadius: "50%", background: r.color }} />}
                  </button>
                );
              })}
              <div style={{ marginTop: 12, padding: "10px 12px", background: "#eff6ff", borderRadius: 10, fontSize: 11, color: "#1e40af", lineHeight: 1.5, border: "1px solid #bfdbfe" }}>
                💡 Mẹo: theo dõi sự dịch chuyển regime qua các quý quan trọng hơn giá trị tuyệt đối từng kỳ. Chuyển từ Đình lạm → Suy giảm → Phục hồi là chu kỳ điển hình để căn thời điểm vào cổ phiếu.
              </div>
            </>
          )}
        </div>
      )}

      <div style={{ textAlign: "center", fontSize: 10, color: "#cbd5e1", marginTop: 16, lineHeight: 1.5 }}>
        Công cụ thực chiến · Vận dụng Map 1 (cơ chế) + Map 2 (chu kỳ)<br/>
        Dữ liệu lưu cục bộ trong artifact này
      </div>
    </div>
  );
}
