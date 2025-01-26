import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

export const create = mutation({
  args: {
    title: v.string(),
    originalImageUrl: v.optional(v.string()),
    currentImageUrl: v.optional(v.string()),
    thumbnailUrl: v.optional(v.string()),
    widht: v.number(),
    height: v.number(),
    canvasState: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.users.getCurrentUser);
    if (user.plan === "free") {
      const projectCount = await ctx.db
        .query("project")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect();

      if (projectCount.length >= 3) {
        throw new Error("Free plan limited to 3 project");
      }
    }
    const projectID = await ctx.db.insert("project", {
      title: args.title,
      userId: user._id,
      canvasState: {},
      widht: args.widht,
      height: args.height,
      originalImageUrl: args.originalImageUrl,
      currentImageUrl: args.currentImageUrl,
      thumbnailUrl: args.thumbnailUrl,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.patch(user._id, {
      projectUsed: user.projectUsed + 1,
      lastActive: Date.now(),
    });

    return projectID;
  },
});
