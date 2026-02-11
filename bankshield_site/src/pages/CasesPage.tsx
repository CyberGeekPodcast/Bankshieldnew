import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

type Role = "user" | "reviewer" | "admin";

type Scope = "mine" | "assignedToMe" | "all";

type CaseStatus =
  | "new"
  | "assigned"
  | "in_review"
  | "waiting_for_docs"
  | "approved"
  | "rejected"
  | "closed";

type CasePriority = "low" | "medium" | "high" | "urgent";

type CaseType = "mortgage_noc" | "tenant_noc" | "kyc" | "bank_statement" | "property_doc" | "other";

function prettyCaseType(t: CaseType) {
  switch (t) {
    case "mortgage_noc":
      return "Mortgage NOC";
    case "tenant_noc":
      return "Tenant NOC";
    case "kyc":
      return "KYC";
    case "bank_statement":
      return "Bank Statement";
    case "property_doc":
      return "Property Docs";
    default:
      return "Other";
  }
}

function badgeClasses(kind: "status" | "priority", value: string) {
  if (kind === "priority") {
    if (value === "urgent") return "bg-red-50 text-red-700 border-red-200";
    if (value === "high") return "bg-orange-50 text-orange-700 border-orange-200";
    if (value === "medium") return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-slate-50 text-slate-700 border-slate-200";
  }

  // status
  if (value === "approved") return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (value === "rejected") return "bg-rose-50 text-rose-700 border-rose-200";
  if (value === "waiting_for_docs") return "bg-indigo-50 text-indigo-700 border-indigo-200";
  if (value === "in_review") return "bg-blue-50 text-blue-700 border-blue-200";
  if (value === "assigned") return "bg-cyan-50 text-cyan-700 border-cyan-200";
  if (value === "closed") return "bg-slate-100 text-slate-700 border-slate-200";
  return "bg-slate-50 text-slate-700 border-slate-200";
}

export function CasesPage() {
  const loggedInUser = useQuery(api.auth.loggedInUser);
  const profile = useQuery(api.userProfiles.myProfile);

  const role: Role = (profile?.role as Role) ?? "user";
  const canReview = role === "reviewer" || role === "admin";

  const defaultScope: Scope = useMemo(() => {
    if (role === "admin") return "all";
    if (role === "reviewer") return "assignedToMe";
    return "mine";
  }, [role]);

  const [scope, setScope] = useState<Scope>("mine");
  const [status, setStatus] = useState<CaseStatus | "">("");
  const [priority, setPriority] = useState<CasePriority | "">("");
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  // Create form state
  const [title, setTitle] = useState("");
  const [caseType, setCaseType] = useState<CaseType>("kyc");
  const [casePriority, setCasePriority] = useState<CasePriority>("medium");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  // Keep scope aligned with role changes
  useEffect(() => {
    setScope(defaultScope);
  }, [defaultScope]);

  const createCase = useMutation(api.cases.createCase);
  const addCaseNote = useMutation(api.cases.addCaseNote);
  const setCaseStatus = useMutation(api.cases.setCaseStatus);
  const assignCase = useMutation(api.cases.assignCase);
  const updateCaseBasics = useMutation(api.cases.updateCaseBasics);

  const cases = useQuery(api.cases.listCases, {
    scope,
    status: status === "" ? undefined : status,
    priority: priority === "" ? undefined : priority,
    limit: 100,
  }) as any[] | undefined;

  const selected = useQuery(
    api.cases.getCase,
    selectedCaseId ? ({ caseId: selectedCaseId } as any) : ("skip" as any)
  ) as any | undefined;

  const notes = useQuery(
    api.cases.listCaseNotes,
    selectedCaseId ? ({ caseId: selectedCaseId } as any) : ("skip" as any)
  ) as any[] | undefined;

  const adminProfiles = useQuery(
    api.userProfiles.listUserProfiles,
    role === "admin" ? ({} as any) : ("skip" as any)
  ) as any[] | undefined;

  const reviewersForAssign = useMemo(() => {
    if (role !== "admin" || !adminProfiles) return [];
    return adminProfiles.filter((p) => p.role === "reviewer" || p.role === "admin");
  }, [adminProfiles, role]);

  const [noteDraft, setNoteDraft] = useState("");
  const [editBasics, setEditBasics] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editTags, setEditTags] = useState("");

  useEffect(() => {
    if (selected) {
      setEditTitle(selected.title ?? "");
      setEditDesc(selected.description ?? "");
      setEditTags((selected.tags ?? []).join(", "));
    }
  }, [selectedCaseId, selected]);

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
            <div className="text-gray-600">Please sign in to view or create cases.</div>
          </div>
        </div>
      </div>
    );
  }

  const safeCases = cases ?? [];

  return (
    <div className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-white/20 p-6 md:p-8">
          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Cases
              </div>
              <div className="mt-2 text-gray-600">
                Create cases, track status, and collaborate with reviewers.
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wide text-gray-500">Role</span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                {role}
              </span>
            </div>
          </div>

          {/* Create case */}
          <div className="mt-8 rounded-xl border border-gray-200 p-5 shadow-sm bg-white">
            <div className="font-semibold text-gray-900">Create a new case</div>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                  placeholder="e.g., Tenant NOC verification – missing address proof"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">Type</label>
                  <select
                    value={caseType}
                    onChange={(e) => setCaseType(e.target.value as CaseType)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 bg-white"
                  >
                    <option value="mortgage_noc">Mortgage NOC</option>
                    <option value="tenant_noc">Tenant NOC</option>
                    <option value="kyc">KYC</option>
                    <option value="bank_statement">Bank Statement</option>
                    <option value="property_doc">Property Docs</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-700">Priority</label>
                  <select
                    value={casePriority}
                    onChange={(e) => setCasePriority(e.target.value as CasePriority)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 bg-white"
                  >
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                    <option value="urgent">urgent</option>
                  </select>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-700">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 min-h-[90px]"
                  placeholder="Add case context, what was observed, missing documents, contradictions, etc."
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm text-gray-700">Tags (comma-separated)</label>
                <input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                  placeholder="e.g., mortgage, address, mismatch"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={async () => {
                  const cleanTitle = title.trim();
                  if (!cleanTitle) {
                    toast.error("Title is required.");
                    return;
                  }
                  try {
                    const tagList = tags
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean);
                    const id = await createCase({
                      title: cleanTitle,
                      description: description.trim() || undefined,
                      caseType,
                      priority: casePriority,
                      tags: tagList,
                    } as any);
                    toast.success("Case created.");
                    setTitle("");
                    setDescription("");
                    setTags("");
                    setSelectedCaseId(String(id));
                  } catch (e: any) {
                    toast.error(e?.message ?? "Could not create case.");
                  }
                }}
                className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700"
              >
                Create case
              </button>
              <div className="text-xs text-gray-500">
                Tip: Reviewers can claim unassigned cases from the queue.
              </div>
            </div>
          </div>

          {/* Case list + detail */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <div className="font-semibold text-gray-900">Case queue</div>
                <div className="flex items-center gap-2 flex-wrap">
                  {canReview ? (
                    <select
                      value={scope}
                      onChange={(e) => setScope(e.target.value as Scope)}
                      className="rounded-lg border border-gray-200 px-3 py-2 bg-white text-sm"
                    >
                      <option value="assignedToMe">Assigned to me</option>
                      <option value="all">All (unassigned + mine)</option>
                      <option value="mine">Created by me</option>
                    </select>
                  ) : (
                    <select
                      value={scope}
                      onChange={(e) => setScope(e.target.value as Scope)}
                      className="rounded-lg border border-gray-200 px-3 py-2 bg-white text-sm"
                    >
                      <option value="mine">My cases</option>
                    </select>
                  )}

                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="rounded-lg border border-gray-200 px-3 py-2 bg-white text-sm"
                  >
                    <option value="">All statuses</option>
                    <option value="new">new</option>
                    <option value="assigned">assigned</option>
                    <option value="in_review">in_review</option>
                    <option value="waiting_for_docs">waiting_for_docs</option>
                    <option value="approved">approved</option>
                    <option value="rejected">rejected</option>
                    <option value="closed">closed</option>
                  </select>

                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="rounded-lg border border-gray-200 px-3 py-2 bg-white text-sm"
                  >
                    <option value="">All priorities</option>
                    <option value="urgent">urgent</option>
                    <option value="high">high</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                  </select>
                </div>
              </div>

              <div className="mt-4 border border-gray-200 rounded-xl overflow-hidden bg-white">
                <div className="max-h-[520px] overflow-auto">
                  {cases === undefined ? (
                    <div className="p-6 text-sm text-gray-600">Loading cases…</div>
                  ) : safeCases.length === 0 ? (
                    <div className="p-6 text-sm text-gray-600">No cases found for this filter.</div>
                  ) : (
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 sticky top-0">
                        <tr>
                          <th className="text-left p-3 font-semibold text-gray-700">Title</th>
                          <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {safeCases.map((c) => {
                          const active = String(c._id) === selectedCaseId;
                          return (
                            <tr
                              key={c._id}
                              className={`border-t border-gray-200 cursor-pointer ${active ? "bg-cyan-50" : "hover:bg-slate-50"}`}
                              onClick={() => setSelectedCaseId(String(c._id))}
                            >
                              <td className="p-3">
                                <div className="font-medium text-gray-900 line-clamp-1">{c.title}</div>
                                <div className="mt-1 flex items-center gap-2 flex-wrap">
                                  <span className={`px-2 py-0.5 rounded-full text-xs border ${badgeClasses("priority", c.priority)}`}>
                                    {c.priority}
                                  </span>
                                  <span className="text-xs text-gray-500">{prettyCaseType(c.caseType)}</span>
                                </div>
                              </td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded-full text-xs border ${badgeClasses("status", c.status)}`}>
                                  {c.status}
                                </span>
                                {canReview && (
                                  <div className="mt-1 text-xs text-gray-500">
                                    {c.assignedEmail ? `Assigned: ${c.assignedEmail}` : "Unassigned"}
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="border border-gray-200 rounded-xl bg-white p-5">
                {!selectedCaseId ? (
                  <div className="text-sm text-gray-600">Select a case to view details.</div>
                ) : selected === undefined ? (
                  <div className="text-sm text-gray-600">Loading case…</div>
                ) : (
                  <>
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <div className="text-xl font-semibold text-gray-900">{selected.title}</div>
                        <div className="mt-1 text-sm text-gray-600">
                          Created by {selected.createdEmail ?? "-"} • {new Date(selected.createdAt).toLocaleString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${badgeClasses("priority", selected.priority)}`}>
                          {selected.priority}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs border ${badgeClasses("status", selected.status)}`}>
                          {selected.status}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="rounded-lg border border-gray-200 p-3">
                        <div className="text-xs uppercase tracking-wide text-gray-500">Type</div>
                        <div className="mt-1 font-medium text-gray-900">{prettyCaseType(selected.caseType)}</div>
                      </div>
                      <div className="rounded-lg border border-gray-200 p-3">
                        <div className="text-xs uppercase tracking-wide text-gray-500">Assigned</div>
                        <div className="mt-1 font-medium text-gray-900">{selected.assignedEmail ?? "Unassigned"}</div>
                      </div>
                      <div className="rounded-lg border border-gray-200 p-3">
                        <div className="text-xs uppercase tracking-wide text-gray-500">Last updated</div>
                        <div className="mt-1 font-medium text-gray-900">{new Date(selected.updatedAt).toLocaleString()}</div>
                      </div>
                    </div>

                    {selected.description && (
                      <div className="mt-4 rounded-lg bg-slate-50 border border-gray-200 p-4 text-sm text-gray-700 whitespace-pre-wrap">
                        {selected.description}
                      </div>
                    )}

                    {(selected.tags?.length ?? 0) > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {selected.tags.map((t: string) => (
                          <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-slate-100 border border-slate-200 text-slate-700">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-center gap-2 flex-wrap">
                        {canReview && !selected.assignedTo && role === "reviewer" && (
                          <button
                            className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-slate-50 text-sm"
                            onClick={async () => {
                              try {
                                await assignCase({ caseId: selected._id } as any);
                                toast.success("Assigned to you.");
                              } catch (e: any) {
                                toast.error(e?.message ?? "Could not assign.");
                              }
                            }}
                          >
                            Assign to me
                          </button>
                        )}

                        {canReview && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Status</span>
                            <select
                              value={selected.status}
                              onChange={async (e) => {
                                const next = e.target.value as CaseStatus;
                                try {
                                  await setCaseStatus({ caseId: selected._id, status: next } as any);
                                  toast.success("Status updated.");
                                } catch (err: any) {
                                  toast.error(err?.message ?? "Could not update status.");
                                }
                              }}
                              className="rounded-lg border border-gray-200 px-3 py-2 bg-white text-sm"
                            >
                              <option value="new">new</option>
                              <option value="assigned">assigned</option>
                              <option value="in_review">in_review</option>
                              <option value="waiting_for_docs">waiting_for_docs</option>
                              <option value="approved">approved</option>
                              <option value="rejected">rejected</option>
                              <option value="closed">closed</option>
                            </select>
                          </div>
                        )}

                        {role === "admin" && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Assign</span>
                            <select
                              value={selected.assignedTo ?? ""}
                              onChange={async (e) => {
                                const val = e.target.value;
                                try {
                                  await assignCase({ caseId: selected._id, assignedTo: val ? (val as any) : undefined } as any);
                                  toast.success("Assignment updated.");
                                } catch (err: any) {
                                  toast.error(err?.message ?? "Could not update assignment.");
                                }
                              }}
                              className="rounded-lg border border-gray-200 px-3 py-2 bg-white text-sm"
                            >
                              <option value="">Unassigned</option>
                              {reviewersForAssign.map((p: any) => (
                                <option key={p.userId} value={p.userId}>
                                  {p.email ?? String(p.userId)} ({p.role})
                                </option>
                              ))}
                            </select>
                          </div>
                        )}
                      </div>

                      {selected.permissions?.canEditBasics && (
                        <button
                          className="px-3 py-2 rounded-lg border border-gray-200 hover:bg-slate-50 text-sm"
                          onClick={() => setEditBasics((v) => !v)}
                        >
                          {editBasics ? "Cancel edit" : "Edit details"}
                        </button>
                      )}
                    </div>

                    {editBasics && (
                      <div className="mt-4 rounded-xl border border-gray-200 p-4 bg-slate-50">
                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <label className="text-sm text-gray-700">Title</label>
                            <input
                              value={editTitle}
                              onChange={(e) => setEditTitle(e.target.value)}
                              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-700">Description</label>
                            <textarea
                              value={editDesc}
                              onChange={(e) => setEditDesc(e.target.value)}
                              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 min-h-[90px] bg-white"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-700">Tags (comma-separated)</label>
                            <input
                              value={editTags}
                              onChange={(e) => setEditTags(e.target.value)}
                              className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 bg-white"
                            />
                          </div>
                        </div>
                        <div className="mt-3">
                          <button
                            className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700"
                            onClick={async () => {
                              try {
                                const tagList = editTags
                                  .split(",")
                                  .map((t) => t.trim())
                                  .filter(Boolean);
                                await updateCaseBasics({
                                  caseId: selected._id,
                                  title: editTitle.trim() || undefined,
                                  description: editDesc.trim() || undefined,
                                  tags: tagList,
                                } as any);
                                toast.success("Case updated.");
                                setEditBasics(false);
                              } catch (e: any) {
                                toast.error(e?.message ?? "Could not update case.");
                              }
                            }}
                          >
                            Save changes
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    <div className="mt-8">
                      <div className="font-semibold text-gray-900">Notes</div>
                      <div className="mt-3 border border-gray-200 rounded-xl overflow-hidden">
                        <div className="max-h-[260px] overflow-auto bg-white">
                          {notes === undefined ? (
                            <div className="p-4 text-sm text-gray-600">Loading notes…</div>
                          ) : notes.length === 0 ? (
                            <div className="p-4 text-sm text-gray-600">No notes yet.</div>
                          ) : (
                            <div className="divide-y divide-gray-200">
                              {notes.map((n) => (
                                <div key={n._id} className="p-4">
                                  <div className="flex items-center justify-between gap-3">
                                    <div className="text-sm font-medium text-gray-900">
                                      {n.authorEmail ?? String(n.authorUserId)}
                                      <span className="ml-2 text-xs text-gray-500">{n.kind}</span>
                                    </div>
                                    <div className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</div>
                                  </div>
                                  <div className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">{n.body}</div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-gray-200">
                          <textarea
                            value={noteDraft}
                            onChange={(e) => setNoteDraft(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 px-3 py-2 min-h-[80px] bg-white"
                            placeholder="Add a note…"
                          />
                          <div className="mt-2 flex items-center justify-between gap-3 flex-wrap">
                            <div className="text-xs text-gray-500">
                              Notes are visible to the case owner and reviewers.
                            </div>
                            <button
                              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                              onClick={async () => {
                                const body = noteDraft.trim();
                                if (!body) return;
                                try {
                                  await addCaseNote({ caseId: selected._id, body } as any);
                                  setNoteDraft("");
                                  toast.success("Note added.");
                                } catch (e: any) {
                                  toast.error(e?.message ?? "Could not add note.");
                                }
                              }}
                            >
                              Add note
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 text-xs text-gray-500">
            For production: add pagination, file uploads, and an “Audit Pack” export flow.
          </div>
        </div>
      </div>
    </div>
  );
}
