import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createMeetingVote = mutation({
  args: { meetingId: v.number(), note: v.number(), comment: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("meetingVotes", {
      meetingId: args.meetingId,
      note: args.note,
      comment: args.comment,
    });
  },
});

export const getMeetingVotes = query({
  args: {
    meetingId: v.number(),
  },
  handler(ctx, args) {
    return ctx.db
      .query("meetingVotes")
      .filter((query) => query.eq(query.field("meetingId"), args.meetingId))
      .order("desc")
      .collect();
  },
});
