import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { sessionPolicyText } from "../lib/authPersistence";

export function DashboardPage() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const profile = useQuery(api.userProfiles.myProfile);

  if (loggedInUser === undefined) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-r-2 border-cyan-500" />
      </div>
    );
  }

  if (loggedInUser === null) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-white/20 p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Not signed in
            </div>
            <div className="text-gray-600">Please sign in to access the dashboard.</div>
          </div>
        </div>
      </div>
    );
  }

  const role = (profile?.role as string) ?? "user";

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Dashboard
              </div>
              <div className="mt-2 text-gray-600">
                Welcome back{loggedInUser.name ? `, ${loggedInUser.name}` : ""}.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-gray-500">Role</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {role}
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="text-sm font-semibold text-gray-800">Account</div>
              <div className="mt-2 text-sm text-gray-700">
                <div>
                  <span className="text-gray-500">Email:</span> {loggedInUser.email ?? "-"}
                </div>
                <div className="mt-1">
                  <span className="text-gray-500">User ID:</span>{" "}
                  <span className="font-mono text-xs">{String(loggedInUser._id)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 p-5 shadow-sm">
              <div className="text-sm font-semibold text-gray-800">Session</div>
              <div className="mt-2 text-sm text-gray-700">{sessionPolicyText()}</div>
              <div className="mt-2 text-xs text-gray-500">
                Change this on the sign-in screen using the "Keep me signed in" checkbox (default is OFF).
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 border border-gray-200 p-5">
            <div className="font-semibold">Next steps</div>
            <ul className="mt-3 text-sm text-gray-700 list-disc pl-5 space-y-1">
              <li>Admins can manage roles from the Admin page.</li>
              <li>Reviewers can use the Reviewer Console.</li>
              <li>Password reset and email verification use Resend (set AUTH_RESEND_KEY).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
