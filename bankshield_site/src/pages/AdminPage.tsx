import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

type Role = "user" | "reviewer" | "admin";

export function AdminPage() {
  const profiles = useQuery(api.userProfiles.listUserProfiles);
  const setUserRole = useMutation(api.userProfiles.setUserRole);
  const seedDemoCases = useMutation(api.cases.seedDemoCases);

  if (profiles === undefined) {
    return (
      <div className="min-h-[calc(100vh-72px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-r-2 border-cyan-500" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Admin
              </div>
              <div className="text-sm text-gray-600 mt-1">Manage user roles (user / reviewer / admin)</div>
            </div>
            <div className="text-xs text-gray-500 max-w-sm">
              Tip: set <span className="font-mono">BANKSHIELD_ADMIN_EMAILS</span> in Convex environment to bootstrap
              the first admin (comma-separated emails).
            </div>
          </div>

          <div className="mt-8 overflow-auto">
            <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left p-3 font-semibold text-gray-700">Email</th>
                  <th className="text-left p-3 font-semibold text-gray-700">User ID</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Role</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((p: any) => (
                  <tr key={p._id} className="border-t border-gray-200">
                    <td className="p-3">
                      <div className="font-medium text-gray-900">{p.email ?? "-"}</div>
                    </td>
                    <td className="p-3 font-mono text-xs text-gray-700">{String(p.userId)}</td>
                    <td className="p-3">
                      <select
                        className="rounded-lg border border-gray-200 px-3 py-2 bg-white"
                        value={p.role as Role}
                        onChange={async (e) => {
                          const role = e.target.value as Role;
                          try {
                            await setUserRole({ userId: p.userId, role });
                            toast.success(`Updated role to ${role}.`);
                          } catch {
                            toast.error("Could not update role.");
                          }
                        }}
                      >
                        <option value="user">user</option>
                        <option value="reviewer">reviewer</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {profiles.length === 0 && (
              <div className="text-center text-gray-600 py-10">No profiles yet. Sign in to create the first profile.</div>
            )}
          </div>

          <div className="mt-8 rounded-xl bg-slate-50 border border-gray-200 p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="font-semibold">Cases utilities</div>
                <div className="mt-1 text-sm text-gray-700">
                  Need sample data? Seed a few demo cases, then open the <span className="font-semibold">Cases</span> page.
                </div>
              </div>
              <button
                className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                onClick={async () => {
                  try {
                    await seedDemoCases({ count: 5 } as any);
                    toast.success("Seeded demo cases.");
                  } catch {
                    toast.error("Could not seed cases.");
                  }
                }}
              >
                Seed demo cases
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
