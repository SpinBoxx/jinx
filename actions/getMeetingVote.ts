"use server";

import prismadb from "@/lib/prismadb";

export const getMeetingVotes = async (shareLink: string) => {
  console.log(shareLink);
  const meeting = await prismadb.meeting.findFirst({
    where: {
      shareLink,
    },
    include: {
      creator: true,
      meetingVote: true,
    },
  });

  console.log({ action: meeting });
  return meeting;
};
