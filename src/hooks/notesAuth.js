// Shared permission helper for the notes API: only whoever knows this
// password can see/create/delete notes (both reads and writes are gated
// server-side). The user types it once per browser tab (never embedded in
// the built JS, unlike a hardcoded key), cached in sessionStorage for the
// rest of the session, sent as the X-Notes-Secret header. The Function
// checks it against NOTES_WRITE_SECRET. Used by useTextAnnotations
// (per-article load/save/delete) and AllNotesModal (global list/delete).
const SECRET_STORAGE_KEY = "study_hub_notes_secret";

export function peekStoredSecret() {
  return sessionStorage.getItem(SECRET_STORAGE_KEY) || "";
}

export function getOrPromptSecret() {
  const cached = peekStoredSecret();
  if (cached) return cached;
  const secret = window.prompt("Nhập mật khẩu để xem/lưu/xoá ghi chú:") || "";
  if (secret) sessionStorage.setItem(SECRET_STORAGE_KEY, secret);
  return secret;
}

export function clearStoredSecret() {
  sessionStorage.removeItem(SECRET_STORAGE_KEY);
}

// Fetch wrapper that attaches X-Notes-Secret, retries once (clearing the
// cached secret first) on a 401, and otherwise behaves exactly like fetch.
// Prompts (via getOrPromptSecret) if no secret is cached yet — only use
// this for USER-INITIATED actions (clicking "show notes", saving, etc.),
// never for automatic background loads (see silentAuthedFetch below).
export async function authedFetch(url, options = {}) {
  const withSecret = (secret) =>
    fetch(url, {
      ...options,
      headers: { ...(options.headers || {}), "X-Notes-Secret": secret },
    });

  let res = await withSecret(getOrPromptSecret());
  if (res.status === 401) {
    clearStoredSecret();
    res = await withSecret(getOrPromptSecret());
  }
  return res;
}

// Non-prompting variant: uses the cached secret if present, otherwise
// sends the request with none (server replies 401). Never triggers
// window.prompt — for automatic background loads (e.g. fetching notes
// every time the active article changes) so simply browsing the app never
// gets interrupted by a password dialog; only an explicit notes action
// (via authedFetch) establishes the session credential.
export async function silentAuthedFetch(url, options = {}) {
  const secret = peekStoredSecret();
  return fetch(url, {
    ...options,
    headers: { ...(options.headers || {}), ...(secret ? { "X-Notes-Secret": secret } : {}) },
  });
}
