import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getAuthUserId } from "@convex-dev/auth/server";

type Role = "user" | "reviewer" | "admin";

function normalizeEmail(email: string | undefined | null): string | undefined {
  if (!email) return undefined;
  const e = email.trim().toLowerCase();
  return e.length ? e : undefined;
}

function getAdminEmails(): Set<string> {
  const raw =
    process.env.BANKSHIELD_ADMIN_EMAILS ??
    process.env.ADMIN_EMAILS ??
    process.env.AUTH_ADMIN_EMAILS ??
    "";
  const parts = raw
    .split(",")
    .map((x) => x.trim().toLowerCase())
    .filter(Boolean);
  return new Set(parts);
}

function isAdminEmail(email: string | undefined): boolean {
  if (!email) return false;
  const admins = getAdminEmails();
  return admins.has(email.toLowerCase());
}

async function requireAuth(ctx: any) {
  const userId = await getAuthUserId(ctx);
  if (!userId) throw new Error("Not authenticated");
  return userId;
}

async function getMyProfile(ctx: any, userId: any) {
  return await ctx.db
    .query("userProfiles")
    .withIndex("by_userId", (q: any) => q.eq("userId", userId))
    .unique();
}

async function requireAdmin(ctx: any) {
  const userId = await requireAuth(ctx);
  const profile = await getMyProfile(ctx, userId);
  if (!profile || profile.role !== "admin") throw new Error("Forbidden");
  return { userId, profile };
}

export const myProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    return await getMyProfile(ctx, userId);
  },
});

export const ensureMyProfile = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await requireAuth(ctx);
    const userDoc: any = await ctx.db.get(userId);
    const email = normalizeEmail(userDoc?.email);

    const existing = await getMyProfile(ctx, userId);
    const now = Date.now();

    const admin = isAdminEmail(email);

    if (existing) {
      const nextRole: Role = admin ? "admin" : (existing.role as Role) ?? "user";
      const needsUpdate = existing.email !== email || existing.role !== nextRole;
      if (needsUpdate) {
        await ctx.db.patch(existing._id, {
          email,
          role: nextRole,
          updatedAt: now,
        });
      } else {
        await ctx.db.patch(existing._id, { updatedAt: now });
      }
      return { ...existing, email, role: nextRole, updatedAt: now };
    }

    const role: Role = admin ? "admin" : "user";
    const _id = await ctx.db.insert("userProfiles", {
      userId,
      email,
      role,
      createdAt: now,
      updatedAt: now,
    });
    return await ctx.db.get(_id);
  },
});

export const listUserProfiles = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const profiles = await ctx.db.query("userProfiles").collect();
    return profiles
      .slice()
      .sort((a: any, b: any) => (a.email ?? "").localeCompare(b.email ?? ""));
  },
});

export const setUserRole = mutation({
  args: {
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("reviewer"), v.literal("admin")),
  },
  handler: async (ctx, args) => {
    await requireAdmin(ctx);

    const userDoc: any = await ctx.db.get(args.userId);
    const email = normalizeEmail(userDoc?.email);
    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();

    const now = Date.now();
    if (existing) {
      await ctx.db.patch(existing._id, {
        role: args.role,
        email,
        updatedAt: now,
      });
      return { ...existing, role: args.role, email, updatedAt: now };
    }

    const _id = await ctx.db.insert("userProfiles", {
      userId: args.userId,
      email,
      role: args.role,
      createdAt: now,
      updatedAt: now,
    });
    return await ctx.db.get(_id);
  },
});
