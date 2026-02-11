"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";
import { toast } from "sonner";
import { resetSessionMarker } from "./lib/authPersistence";

export function SignOutButton() {
  const { isAuthenticated } = useConvexAuth();
  const { signOut } = useAuthActions();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <button
      className="px-4 py-2 rounded bg-white text-secondary border border-gray-200 font-semibold hover:bg-gray-50 hover:text-slate-700 transition-colors shadow-sm hover:shadow"
      onClick={() => {
        void (async () => {
          try {
            await signOut();
            toast.success("Signed out.");
          } catch {
            toast.error("Could not sign out.");
          } finally {
            // If remember-me is OFF, next tab session should start signed out.
            resetSessionMarker();
          }
        })();
      }}
    >
      Sign out
    </button>
  );
}
