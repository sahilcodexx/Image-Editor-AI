import { mutation, query } from "./_generated/server";
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

export const getUserProjects = query({
  handler: async (ctx) => {
    const user = await ctx.runQuery(api.users.getCurrentUser);
    const projects = await ctx.db
      .query("project")
      .withIndex("by_user_updated", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();
    return projects;
  },
});

export const deleteProjects = mutation({
  args: { projectID: v.id("project") },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.users.getCurrentUser);

    const project = await ctx.db.get(args.projectID);

    if (!project) {
      throw new Error("Project not found");
    }

    if (!user || project.userId !== user._id) {
      throw new Error("access denied");
    }

    await ctx.db.delete(args.projectID);

    await ctx.db.patch(user._id, {
      projectUsed: Math.max(0, user.projectUsed - 1),
      lastActive: Date.now(),
    });
    return { success: true };
  },
});
