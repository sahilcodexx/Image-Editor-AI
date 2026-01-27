import { Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";

export type User = {
  _id: Id<"users">;
  _creationTime: number; // Convex adds this automatically
  name: string;
  tokenIdentifier: string;
  email: string;
  plan: "free" | "pro";
  projectUsed: number;
  exportProjectThisMonth: number;
  createdAt: number;
  lastActive: number;
  imageUrl?: string; // optional
};

export const store = mutation({
  args: {},
  handler: async (ctx): Promise<Id<"users">> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity)
      throw new Error("Called storeUser without authentication present");

    // Find existing user by token
    const user = (await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique()) as User | null;

    if (user) {
      // Update name if changed
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }

    // Create new user
    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email ?? "",
      plan: "free",
      projectUsed: 0,
      exportProjectThisMonth: 0,
      createdAt: Date.now(),
      lastActive: Date.now(),
    });
  },
});

export const getCurrentUser = query({
  handler: async (ctx): Promise<User> => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not Authenticated");

    const user = (await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique()) as User | null;

    if (!user) throw new Error("user not found");

    return user;
  },
});
