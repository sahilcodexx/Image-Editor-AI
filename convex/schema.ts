import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),

    plan: v.union(v.literal("free"), v.literal("pro")),

    //This is for traking limits of user
    projectUsed: v.number(), //current project count
    exportProjectThisMonth: v.number(), // Monthly export limit tracking

    createdAt: v.number(),
    lastActive: v.number(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_email", ["email"])
    .searchIndex("search_name", { searchField: "name" })
    .searchIndex("search_email", { searchField: "email" }),

  project: defineTable({
    // Basic info about project
    title: v.string(),
    userId: v.id("users"),

    // Canvas related
    canvasState: v.any(),
    widht: v.number(),
    height: v.number(),

    // Image related
    originalImageUrl: v.optional(v.string()),
    currentImageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),

    // Tranformation to ImageKit
    activeTransformation: v.optional(v.string()),

    // Ai feature state - tracks what AI processing has been applied
    backgroundRemove: v.optional(v.boolean()),

    // Organization
    folderId: v.optional(v.id("folders")),

    // TimeStamp
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_user_updated", ["userId", "updatedAt"])
    .index("by_folder", ["folderId"]),

  folder: defineTable({
    name: v.string(),
    userId: v.id("userId"),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});
