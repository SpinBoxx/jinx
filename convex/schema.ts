import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  meetingVotes: defineTable({
    meetingId: v.float64(),
    note: v.float64(),
    comment: v.string(),
  }),
});
