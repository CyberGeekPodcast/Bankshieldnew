"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { getRememberMeEnabled, setRememberMeEnabled } from "./lib/authPersistence";

type AuthView =
  | "signIn"
  | "signUp"
  | "resetRequest"
  | "resetVerify"
  | "verifyEmail";

const allowGuest = String(import.meta.env.VITE_ALLOW_ANONYMOUS_LOGIN ?? "false").toLowerCase() === "true";

function normalizeError(err: unknown): string {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

function friendlyAuthError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("invalid password")) return "Invalid password. Please try again.";
  if (m.includes("user") && m.includes("not found")) return "No account found for this email.";
  if (m.includes("user") && m.includes("exists"))
    return "An account with this email already exists. Try signing in instead.";
  if (m.includes("invalid") && m.includes("email")) return "Please enter a valid email address.";
  if (m.includes("verification") && m.includes("code"))
    return "Invalid verification code. Please check the code and try again.";
  if (m.includes("expired") && m.includes("code"))
    return "That code has expired. Request a new one and try again.";
  if (m.includes("too many") || m.includes("rate"))
    return "Too many attempts. Please wait a moment and try again.";
  if (m.includes("email") && (m.includes("provider") || m.includes("deliver") || m.includes("send")))
    return "Email delivery isn't configured or failed. Please contact the admin or try again later.";
  // Generic fallback
  return "Something went wrong. Please try again.";
}

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [view, setView] = useState<AuthView>("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(() => getRememberMeEnabled());

  // Persisted fields across flows so users don't retype.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const primaryCtaLabel = useMemo(() => {
    switch (view) {
      case "signIn":
        return "Sign in";
      case "signUp":
        return "Create account";
      case "resetRequest":
        return "Send reset code";
      case "resetVerify":
        return "Set new password";
      case "verifyEmail":
        return "Verify email";
      default:
        return "Continue";
    }
  }, [view]);

  const showPassword = view === "signIn" || view === "signUp";
  const showConfirmPassword = view === "signUp";
  const showResetCode = view === "resetVerify" || view === "verifyEmail";
  const showNewPassword = view === "resetVerify";
  const lockEmail = view === "resetVerify" || view === "verifyEmail";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;

    // Lightweight client-side validation
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (view === "signUp") {
      if ((password ?? "").length < 8) {
        toast.error("Password must be at least 8 characters.");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
    }

    if (view === "signIn" && !password) {
      toast.error("Please enter your password.");
      return;
    }

    if ((view === "resetVerify" || view === "verifyEmail") && !code.trim()) {
      toast.error("Please enter the verification code.");
      return;
    }

    if (view === "resetVerify" && (newPassword ?? "").length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);

    // Convex Password provider expects a FormData with a 'flow' field.
    const formData = new FormData();
    formData.set("email", email);

    // Map UI state -> backend flow
    const flow =
      view === "signIn"
        ? "signIn"
        : view === "signUp"
          ? "signUp"
          : view === "resetRequest"
            ? "reset"
            : view === "resetVerify"
              ? "reset-verification"
              : "email-verification";
    formData.set("flow", flow);

    if (view === "signIn" || view === "signUp") {
      formData.set("password", password);
    }
    if (view === "resetVerify") {
      formData.set("code", code);
      formData.set("newPassword", newPassword);
    }
    if (view === "verifyEmail") {
      formData.set("code", code);
    }

    try {
      await signIn("password", formData);

      if (view === "resetRequest") {
        toast.success("Reset code sent. Check your email.");
        setView("resetVerify");
      } else if (view === "resetVerify") {
        toast.success("Password updated. You can now sign in.");
        setPassword("");
        setConfirmPassword("");
        setCode("");
        setNewPassword("");
        setView("signIn");
      } else if (view === "verifyEmail") {
        toast.success("Email verified. You can now sign in.");
        setCode("");
        setView("signIn");
      } else if (view === "signUp") {
        toast.success(rememberMe ? "Account created. You'll stay signed in on this device." : "Account created. Session will end when you close the tab.");
      } else {
        toast.success(rememberMe ? "Signed in. You'll stay signed in on this device." : "Signed in. Session will end when you close the tab.");
      }
    } catch (err: unknown) {
      const raw = normalizeError(err);
      const friendly = friendlyAuthError(raw);

      // If the backend indicates verification is required, guide the user.
      const lower = raw.toLowerCase();
      if (lower.includes("verification") && (lower.includes("required") || lower.includes("verify"))) {
        toast.error("Please verify your email to continue.");
        setView("verifyEmail");
      } else {
        toast.error(friendly);
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className={`auth-input-field ${lockEmail ? "bg-gray-100 cursor-not-allowed" : ""}`}
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          readOnly={lockEmail}
          aria-readonly={lockEmail}
        />

        {lockEmail && (
          <div className="-mt-2 text-xs text-gray-500">
            Using the email from the previous step.{' '}
            <button
              type="button"
              className="text-primary hover:underline font-medium"
              onClick={() => {
                setView("resetRequest");
                setCode("");
                setNewPassword("");
              }}
            >
              Use a different email
            </button>
          </div>
        )}

        {showPassword && (
          <input
            className="auth-input-field"
            type="password"
            name="password"
            placeholder={view === "signUp" ? "Create a password (min 8 chars)" : "Password"}
            autoComplete={view === "signUp" ? "new-password" : "current-password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {showConfirmPassword && (
          <input
            className="auth-input-field"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}

        {showResetCode && (
          <input
            className="auth-input-field"
            type="text"
            name="code"
            placeholder="Verification code"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        )}

        {showNewPassword && (
          <input
            className="auth-input-field"
            type="password"
            name="newPassword"
            placeholder="New password (min 8 chars)"
            autoComplete="new-password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        )}

        {(view === "signIn" || view === "signUp") && (
          <div className="flex items-center justify-between gap-3 text-sm text-slate-600 -mt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                checked={rememberMe}
                onChange={(e) => {
                  const v = e.target.checked;
                  setRememberMe(v);
                  setRememberMeEnabled(v);
                }}
              />
              <span>Keep me signed in</span>
            </label>
            <span className="text-xs text-gray-500">{rememberMe ? "Stays signed in" : "Ends when tab closes"}</span>
          </div>
        )}

        <button className="auth-button" type="submit" disabled={submitting}>
          {submitting ? "Please wait…" : primaryCtaLabel}
        </button>

        {/* Secondary actions */}
        <div className="flex flex-col gap-3 text-sm">
          {(view === "signIn" || view === "signUp") && (
            <div className="text-center text-secondary">
              <span>
                {view === "signIn" ? "Don't have an account? " : "Already have an account? "}
              </span>
              <button
                type="button"
                className="text-primary hover:text-primary-hover hover:underline font-medium cursor-pointer"
                onClick={() => {
                  setView(view === "signIn" ? "signUp" : "signIn");
                  setCode("");
                  setNewPassword("");
                }}
              >
                {view === "signIn" ? "Sign up" : "Sign in"}
              </button>
            </div>
          )}

          {view === "signIn" && (
            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-secondary hover:text-slate-700 hover:underline"
                onClick={() => {
                  setView("resetRequest");
                  setCode("");
                  setNewPassword("");
                }}
              >
                Forgot password?
              </button>
              <button
                type="button"
                className="text-secondary hover:text-slate-700 hover:underline"
                onClick={() => {
                  setView("verifyEmail");
                  setCode("");
                }}
              >
                Verify email
              </button>
            </div>
          )}

          {(view === "resetRequest" || view === "resetVerify" || view === "verifyEmail") && (
            <div className="text-center">
              <button
                type="button"
                className="text-secondary hover:text-slate-700 hover:underline"
                onClick={() => {
                  setView("signIn");
                  setCode("");
                  setNewPassword("");
                }}
              >
                Back to sign in
              </button>
            </div>
          )}
        </div>
      </form>

      {allowGuest && (
      <div className="flex items-center justify-center my-4">
              <hr className="my-4 grow border-gray-200" />
              <span className="mx-4 text-secondary">or</span>
              <hr className="my-4 grow border-gray-200" />
            </div>
      
            <button
              className="auth-button"
              disabled={submitting}
              onClick={async () => {
                if (submitting) return;
                setSubmitting(true);
                try {
                  setRememberMe(false);
                  setRememberMeEnabled(false);
                  await signIn("anonymous");
                  toast.success("Signed in as guest (tab session).");
                } catch {
                  toast.error("Could not sign in anonymously.");
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              Continue as guest
            </button>
    )}
</div>
  );
}
