import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  blogPosts: defineTable({
    title: v.string(),
    slug: v.string(),
    excerpt: v.string(),
    content: v.string(),
    author: v.string(),
    publishedAt: v.number(),
    tags: v.array(v.string()),
    featured: v.boolean(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["publishedAt"]),

  partners: defineTable({
    name: v.string(),
    logo: v.string(),
    website: v.optional(v.string()),
    type: v.union(
      v.literal("bank"),
      v.literal("fintech"),
      v.literal("government"),
      v.literal("technology")
    ),
    featured: v.boolean(),
  }),

  contactInquiries: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    inquiryType: v.union(
      v.literal("demo"),
      v.literal("investor"),
      v.literal("partnership"),
      v.literal("general")
    ),
    message: v.string(),
    status: v.union(v.literal("new"), v.literal("contacted"), v.literal("closed")),
  }).index("by_status", ["status"]),

  products: defineTable({
    name: v.string(),
    tagline: v.string(),
    description: v.string(),
    features: v.array(v.string()),
    targetAudience: v.string(),
    pricing: v.optional(v.string()),
    icon: v.string(),
  }),
};

const userProfiles = defineTable({
  userId: v.id("users"),
  email: v.optional(v.string()),
  role: v.union(v.literal("user"), v.literal("reviewer"), v.literal("admin")),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_userId", ["userId"])
  .index("by_email", ["email"])
  .index("by_role", ["role"]);

const cases = defineTable({
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
  status: v.union(
    v.literal("new"),
    v.literal("assigned"),
    v.literal("in_review"),
    v.literal("waiting_for_docs"),
    v.literal("approved"),
    v.literal("rejected"),
    v.literal("closed")
  ),
  tags: v.array(v.string()),
  createdBy: v.id("users"),
  assignedTo: v.optional(v.id("users")),
  dueAt: v.optional(v.number()),
  createdAt: v.number(),
  updatedAt: v.number(),
})
  .index("by_createdBy", ["createdBy"])
  .index("by_assignedTo", ["assignedTo"])
  .index("by_status", ["status"])
  .index("by_updatedAt", ["updatedAt"])
  .index("by_status_assignedTo", ["status", "assignedTo"]);

const caseNotes = defineTable({
  caseId: v.id("cases"),
  authorUserId: v.id("users"),
  authorEmail: v.optional(v.string()),
  body: v.string(),
  kind: v.union(
    v.literal("note"),
    v.literal("status_change"),
    v.literal("assignment_change"),
    v.literal("system")
  ),
  createdAt: v.number(),
})
  .index("by_caseId", ["caseId"])
  .index("by_createdAt", ["createdAt"])
  .index("by_caseId_createdAt", ["caseId", "createdAt"]);

export default defineSchema({
  ...authTables,
  ...applicationTables,
  userProfiles,
  cases,
  caseNotes,
});
