import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const submitInquiry = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("contactInquiries", {
      ...args,
      status: "new",
    });
  },
});

export const getInquiries = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contactInquiries")
      .order("desc")
      .collect();
  },
});
