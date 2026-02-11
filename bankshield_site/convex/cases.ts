import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

type Role = "user" | "reviewer" | "admin";
type CaseStatus =
  | "new"
  | "assigned"
  | "in_review"
  | "waiting_for_docs"
  | "approved"
  | "rejected"
  | "closed";

type CasePriority = "low" | "medium" | "high" | "urgent";

type CaseType =
  | "mortgage_noc"
  | "tenant_noc"
  | "kyc"
  | "bank_statement"
  | "property_doc"
  | "other";

function normalizeEmail(email: string | undefined | null): string | undefined {
  if (!email) return undefined;
  const e = email.trim().toLowerCase();
  return e.length ? e : undefined;
}

async function requireAuth(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Not authenticated");
  return userId;
}

async function getRole(ctx: any, userId: any): Promise<Role> {
  const profile = await ctx.db
    .query("userProfiles")
    .withIndex("by_userId", (q: any) => q.eq("userId", userId))
    .unique();
  return (profile?.role as Role) ?? "user";
}

async function getUserEmail(ctx: any, userId: any): Promise<string | undefined> {
  const userDoc: any = await ctx.db.get(userId);
  return normalizeEmail(userDoc?.email);
}

function canReviewerSeeCase(role: Role, userId: any, c: any): boolean {
  if (role === "admin") return true;
  if (role !== "reviewer") return c.createdBy === userId;
  // Reviewers can see unassigned cases, cases assigned to them, and cases created by them.
  return c.createdBy === userId || c.assignedTo === undefined || c.assignedTo === userId;
}

async function requireCanViewCase(ctx: any, userId: any, role: Role, caseId: any) {
  const c = await ctx.db.get(caseId);
  if (!c) throw new Error("Case not found");
  if (!canReviewerSeeCase(role, userId, c)) throw new Error("Forbidden");
  return c;
}

async function insertSystemNote(ctx: any, args: {
  caseId: any;
  authorUserId: any;
  authorEmail?: string;
  body: string;
  kind: "system" | "status_change" | "assignment_change";
}) {
  await ctx.db.insert("caseNotes", {
    caseId: args.caseId,
    authorUserId: args.authorUserId,
    authorEmail: args.authorEmail,
    body: args.body,
    kind: args.kind,
    createdAt: Date.now(),
  });
}

export const createCase = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    caseType: v.union(
      v.literal("mortgage_noc"),
      v.literal("tenant_noc"),
      v.literal("kyc"),
      v.literal("bank_statement"),
      v.literal("property_doc"),
      v.literal("other")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent")),
    tags: v.optional(v.array(v.string())),
    dueAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const email = await getUserEmail(ctx, userId);

    const now = Date.now();
    const status: CaseStatus = "new";

    const caseId = await ctx.db.insert("cases", {
      title: args.title.trim(),
      description: args.description?.trim(),
      caseType: args.caseType as CaseType,
      priority: args.priority as CasePriority,
      status,
      tags: (args.tags ?? []).map((t) => t.trim()).filter(Boolean),
      createdBy: userId,
      assignedTo: undefined,
      dueAt: args.dueAt,
      createdAt: now,
      updatedAt: now,
    });

    await insertSystemNote(ctx, {
      caseId,
      authorUserId: userId,
      authorEmail: email,
      body: "Case created",
      kind: "system",
    });

    return caseId;
  },
});

export const listCases = query({
  args: {
    scope: v.union(v.literal("mine"), v.literal("assignedToMe"), v.literal("all")),
    status: v.optional(
      v.union(
        v.literal("new"),
        v.literal("assigned"),
        v.literal("in_review"),
        v.literal("waiting_for_docs"),
        v.literal("approved"),
        v.literal("rejected"),
        v.literal("closed")
      )
    ),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.literal("urgent"))),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const role = await getRole(ctx, userId);

    const scope = args.scope;
    const statusFilter = args.status as CaseStatus | undefined;
    const priorityFilter = args.priority as CasePriority | undefined;

    // Start with a broad query, then filter in JS (simpler + safe for small/medium lists).
    // For larger volumes, you can switch to indexed queries.
    let cases: any[] = [];

    if (scope === "mine") {
      cases = await ctx.db
        .query("cases")
        .withIndex("by_createdBy", (q: any) => q.eq("createdBy", userId))
        .collect();
    } else if (scope === "assignedToMe") {
      if (role !== "reviewer" && role !== "admin") throw new Error("Forbidden");
      cases = await ctx.db
        .query("cases")
        .withIndex("by_assignedTo", (q: any) => q.eq("assignedTo", userId))
        .collect();
    } else {
      // scope === "all"
      if (role === "admin") {
        cases = await ctx.db.query("cases").collect();
      } else if (role === "reviewer") {
        // Reviewers see unassigned + assigned-to-me + created-by-me.
        cases = await ctx.db.query("cases").collect();
        cases = cases.filter((c) => canReviewerSeeCase(role, userId, c));
      } else {
        throw new Error("Forbidden");
      }
    }

    if (statusFilter) {
      cases = cases.filter((c) => c.status === statusFilter);
    }

    if (priorityFilter) {
      cases = cases.filter((c) => c.priority === priorityFilter);
    }

    cases.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));

    const limit = Math.max(1, Math.min(args.limit ?? 50, 200));
    cases = cases.slice(0, limit);

    // Enrich with emails for display.
    const out: any[] = [];
    for (const c of cases) {
      const createdEmail = await getUserEmail(ctx, c.createdBy);
      const assignedEmail = c.assignedTo ? await getUserEmail(ctx, c.assignedTo) : undefined;
      out.push({
        ...c,
        createdEmail,
        assignedEmail,
      });
    }

    return out;
  },
});

export const getCase = query({
  args: { caseId: v.id("cases") },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const role = await getRole(ctx, userId);
    const c: any = await requireCanViewCase(ctx, userId, role, args.caseId);

    const createdEmail = await getUserEmail(ctx, c.createdBy);
    const assignedEmail = c.assignedTo ? await getUserEmail(ctx, c.assignedTo) : undefined;

    const canChangeStatus = role === "admin" || role === "reviewer";
    const canAssign = role === "admin" || role === "reviewer";
    const canEditBasics = c.createdBy === userId && (c.status === "new" || c.status === "assigned");

    return {
      ...c,
      createdEmail,
      assignedEmail,
      permissions: {
        role,
        canChangeStatus,
        canAssign,
        canEditBasics,
        isOwner: c.createdBy === userId,
      },
    };
  },
});

export const listCaseNotes = query({
  args: { caseId: v.id("cases") },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const role = await getRole(ctx, userId);
    await requireCanViewCase(ctx, userId, role, args.caseId);

    const notes = await ctx.db
      .query("caseNotes")
      .withIndex("by_caseId_createdAt", (q: any) => q.eq("caseId", args.caseId))
      .collect();

    // Ensure chronological ordering
    notes.sort((a: any, b: any) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
    return notes;
  },
});

export const addCaseNote = mutation({
  args: {
    caseId: v.id("cases"),
    body: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const role = await getRole(ctx, userId);
    const c: any = await requireCanViewCase(ctx, userId, role, args.caseId);

    // Owners can always note on their case. Reviewers can note on cases they can view.
    if (c.createdBy !== userId && role === "user") throw new Error("Forbidden");

    const email = await getUserEmail(ctx, userId);

    const _id = await ctx.db.insert("caseNotes", {
      caseId: args.caseId,
      authorUserId: userId,
      authorEmail: email,
      body: args.body.trim(),
      kind: "note",
      createdAt: Date.now(),
    });

    await ctx.db.patch(args.caseId, { updatedAt: Date.now() });
    return _id;
  },
});

export const updateCaseBasics = mutation({
  args: {
    caseId: v.id("cases"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    dueAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const role = await getRole(ctx, userId);
    const c: any = await requireCanViewCase(ctx, userId, role, args.caseId);

    if (c.createdBy !== userId) throw new Error("Forbidden");
    if (!(c.status === "new" || c.status === "assigned")) {
      throw new Error("Case can no longer be edited.");
    }

    const patch: any = { updatedAt: Date.now() };
    if (args.title !== undefined) patch.title = args.title.trim();
    if (args.description !== undefined) patch.description = args.description.trim();
    if (args.tags !== undefined) patch.tags = args.tags.map((t) => t.trim()).filter(Boolean);
    if (args.dueAt !== undefined) patch.dueAt = args.dueAt;

    await ctx.db.patch(args.caseId, patch);
    return await ctx.db.get(args.caseId);
  },
});

export const assignCase = mutation({
  args: {
    caseId: v.id("cases"),
    assignedTo: v.optional(v.id("users")),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const role = await getRole(ctx, userId);
    const c: any = await requireCanViewCase(ctx, userId, role, args.caseId);

    if (role !== "reviewer" && role !== "admin") throw new Error("Forbidden");

    const nextAssignedTo = role === "admin" ? args.assignedTo ?? undefined : userId;

    const prev = c.assignedTo;
    const now = Date.now();

    await ctx.db.patch(args.caseId, {
      assignedTo: nextAssignedTo,
      status: nextAssignedTo ? (c.status === "new" ? "assigned" : c.status) : c.status,
      updatedAt: now,
    });

    const authorEmail = await getUserEmail(ctx, userId);
    await insertSystemNote(ctx, {
      caseId: args.caseId,
      authorUserId: userId,
      authorEmail,
      body: `Assignment changed: ${prev ? String(prev) : "unassigned"} → ${nextAssignedTo ? String(nextAssignedTo) : "unassigned"}`,
      kind: "assignment_change",
    });

    return await ctx.db.get(args.caseId);
  },
});

export const setCaseStatus = mutation({
  args: {
    caseId: v.id("cases"),
    status: v.union(
      v.literal("new"),
      v.literal("assigned"),
      v.literal("in_review"),
      v.literal("waiting_for_docs"),
      v.literal("approved"),
      v.literal("rejected"),
      v.literal("closed")
    ),
  },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const role = await getRole(ctx, userId);
    const c: any = await requireCanViewCase(ctx, userId, role, args.caseId);

    if (role !== "reviewer" && role !== "admin") throw new Error("Forbidden");

    const prevStatus = c.status as CaseStatus;
    const nextStatus = args.status as CaseStatus;

    const patch: any = {
      status: nextStatus,
      updatedAt: Date.now(),
    };

    // If a reviewer touches an unassigned case, auto-assign to self.
    if (role === "reviewer" && !c.assignedTo) {
      patch.assignedTo = userId;
      if (prevStatus === "new") patch.status = nextStatus === "new" ? "assigned" : nextStatus;
    }

    await ctx.db.patch(args.caseId, patch);

    const authorEmail = await getUserEmail(ctx, userId);
    await insertSystemNote(ctx, {
      caseId: args.caseId,
      authorUserId: userId,
      authorEmail,
      body: `Status changed: ${prevStatus} → ${nextStatus}`,
      kind: "status_change",
    });

    return await ctx.db.get(args.caseId);
  },
});

export const seedDemoCases = mutation({
  args: { count: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const userId = await requireAuth(ctx);
    const role = await getRole(ctx, userId);
    if (role !== "admin") throw new Error("Forbidden");

    const now = Date.now();
    const count = Math.max(1, Math.min(args.count ?? 5, 25));

    const created: any[] = [];
    for (let i = 0; i < count; i++) {
      const caseId = await ctx.db.insert("cases", {
        title: `Demo Case #${i + 1}`,
        description: "Sample case for reviewer workflow demo.",
        caseType: "kyc" as CaseType,
        priority: (i % 4 === 0 ? "urgent" : i % 3 === 0 ? "high" : "medium") as CasePriority,
        status: "new" as CaseStatus,
        tags: ["demo"],
        createdBy: userId,
        assignedTo: undefined,
        createdAt: now,
        updatedAt: now,
      });
      await insertSystemNote(ctx, {
        caseId,
        authorUserId: userId,
        authorEmail: await getUserEmail(ctx, userId),
        body: "Case created (seed)",
        kind: "system",
      });
      created.push(caseId);
    }

    return created;
  },
});
