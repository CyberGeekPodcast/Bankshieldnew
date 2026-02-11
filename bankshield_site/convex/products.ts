import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllProducts = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const seedProducts = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing products first
    const existingProducts = await ctx.db.query("products").collect();
    for (const product of existingProducts) {
      await ctx.db.delete(product._id);
    }

    // Seed single focused product
    const product = {
      name: "BankShield Compliance Copilot",
      tagline: "AI-Powered Document Intelligence for Lending Operations",
      description: "Complete AI solution for processing loan documents, mapping compliance requirements, and generating audit-ready evidence packages for NBFC risk and compliance teams.",
      features: [
        "Document Intelligence Module - OCR and NLP for all loan documents",
        "Policy Mapping Engine - Auto-map to RBI/NBFC compliance requirements", 
        "Audit Evidence Generator - Immutable logs and compliance packages",
        "Approval Workflow System - Multi-level review and sign-off process"
      ],
      targetAudience: "NBFC Risk & Compliance Teams",
      pricing: "₹15,000/analyst/month",
      icon: "🤖"
    };

    await ctx.db.insert("products", product);
  },
});
