// Đọc/ghi sub-tab hiện tại của một bài viết vào query param ?s=... trên URL,
// để mỗi tab con bên trong một bài viết (vd. "Thái Dương" trong Purple Star
// Astrology) cũng có link riêng để chia sẻ trực tiếp. Dùng chung cho mọi
// bài viết trong src/articles/** — mỗi bài chỉ cần đọc giá trị khởi tạo qua
// getSubTabFromUrl() rồi đồng bộ ngược qua syncSubTabToUrl() mỗi khi đổi tab.
const PARAM = "s";

export function getSubTabFromUrl() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(PARAM);
}

// value = null/undefined để XÓA param (dùng khi quay về view mặc định không
// cần link riêng, ví dụ "Start Here" của Chunk Atlas).
export function syncSubTabToUrl(value) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  if (value == null) {
    if (!params.has(PARAM)) return;
    params.delete(PARAM);
  } else {
    const str = String(value);
    if (params.get(PARAM) === str) return;
    params.set(PARAM, str);
  }
  const qs = params.toString();
  const newUrl = `${window.location.pathname}${qs ? "?" + qs : ""}${window.location.hash}`;
  window.history.replaceState(null, "", newUrl);
}
