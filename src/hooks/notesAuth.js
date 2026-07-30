// Shared permission helper for the notes API: only whoever knows this
// password can see/create/delete notes (both reads and writes are gated
// server-side), AND the notes UI (buttons/panels) itself is hidden from
// anyone whose browser hasn't been recognized yet — see isVerified below.
// The password is typed once per device (never embedded in the built JS,
// unlike a hardcoded key), cached in localStorage so it's remembered
// indefinitely on that browser (not just the current tab/session), sent as
// the X-Notes-Secret header. The Function checks it against
// NOTES_WRITE_SECRET. Used by useTextAnnotations (per-article load/save/
// delete) and AllNotesModal (global list/delete).
const SECRET_STORAGE_KEY = "study_hub_notes_secret";
const VERIFIED_STORAGE_KEY = "study_hub_notes_verified";

export function peekStoredSecret() {
  return localStorage.getItem(SECRET_STORAGE_KEY) || "";
}

export function getOrPromptSecret() {
  const cached = peekStoredSecret();
  if (cached) return cached;
  const secret = window.prompt("Nhập mật khẩu để xem/lưu/xoá ghi chú:") || "";
  if (secret) localStorage.setItem(SECRET_STORAGE_KEY, secret);
  return secret;
}

export function clearStoredSecret() {
  localStorage.removeItem(SECRET_STORAGE_KEY);
}

// True once a request has actually succeeded with the cached secret (see
// authedFetch) — i.e. this browser has been confirmed as belonging to
// whoever knows the password. Drives whether the notes UI renders at all.
export function isVerified() {
  return localStorage.getItem(VERIFIED_STORAGE_KEY) === "1";
}

export function forgetVerification() {
  localStorage.removeItem(VERIFIED_STORAGE_KEY);
  clearStoredSecret();
}

// Fetch wrapper that attaches X-Notes-Secret, retries once (clearing the
// cached secret first) on a 401, and otherwise behaves exactly like fetch.
// Prompts (via getOrPromptSecret) if no secret is cached yet — only use
// this for USER-INITIATED actions (clicking "show notes", saving, etc.),
// never for automatic background loads (see silentAuthedFetch below). Any
// non-401 response proves the secret the server just saw is correct
// (checkSecret runs before anything else in the Function), so that also
// marks this browser as verified.
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
  if (res.status !== 401) localStorage.setItem(VERIFIED_STORAGE_KEY, "1");
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
