/**
 * BankShield auth session persistence.
 *
 * Convex Auth stores tokens in localStorage.
 *
 * Remember me OFF (default):
 * - Keep auth across refreshes in the same tab.
 * - End session when the tab/window is closed and later reopened.
 *
 * Remember me ON:
 * - Keep auth across browser restarts until the user signs out.
 */

const REMEMBER_ME_KEY = "bankshield.rememberMe";
const SESSION_MARKER_KEY = "bankshield.sessionMarker";

export function getRememberMeEnabled(): boolean {
  try {
    return localStorage.getItem(REMEMBER_ME_KEY) === "1";
  } catch {
    return false;
  }
}

export function setRememberMeEnabled(enabled: boolean): void {
  try {
    localStorage.setItem(REMEMBER_ME_KEY, enabled ? "1" : "0");
  } catch {
    // ignore
  }
}

function isConvexAuthKey(key: string): boolean {
  // Convex Auth commonly stores keys like "__convexAuthJWT_..." and "__convexAuthRefreshToken_...".
  // Some tooling/docs show a single-underscore variant too.
  return (
    key.startsWith("__convexAuth") ||
    key.startsWith("_convexAuth") ||
    key.includes("convexAuthJWT") ||
    key.includes("convexAuthRefreshToken")
  );
}

export function clearConvexAuthTokens(): void {
  try {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && isConvexAuthKey(k)) toRemove.push(k);
    }
    for (const k of toRemove) localStorage.removeItem(k);
  } catch {
    // ignore
  }
}

export function resetSessionMarker(): void {
  try {
    sessionStorage.removeItem(SESSION_MARKER_KEY);
  } catch {
    // ignore
  }
}

export function applySessionPersistencePolicy(): void {
  try {
    const remember = getRememberMeEnabled();
    if (remember) return;

    // If this is a fresh tab/window session (marker absent), clear any old tokens
    // so the user does not remain logged in after a browser restart.
    const marker = sessionStorage.getItem(SESSION_MARKER_KEY);
    if (!marker) {
      clearConvexAuthTokens();
    }

    // Mark this tab session as active (persists across reloads in the same tab).
    sessionStorage.setItem(SESSION_MARKER_KEY, "1");
  } catch {
    // ignore
  }
}

export function sessionPolicyText(): string {
  return getRememberMeEnabled()
    ? "You will stay signed in on this device until you sign out."
    : "Session will end when you close this tab (default).";
}
