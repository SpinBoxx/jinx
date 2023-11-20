import { auth } from "@/auth";
import { internalError } from "@/global-message";
import prismadb from "@/lib/prismadb";
import { zodCheckParse } from "@/services/utils";
import { meetingVoteSchema } from "@/types/meeting";
import { NextResponse } from "next/server";
import { z } from "zod";

interface Props {
  params: {
    roomVoteId: string;
  };
}

export async function POST(request: Request, { params }: Props) {
  try {
    const body = await request.json();
    const session = await auth();

    if (!session)
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        { status: 401 }
      );

    console.log(params);

    if (!params.roomVoteId)
      return NextResponse.json(
        {
          message: "Veuillez renseinger un numero de vote room",
        },
        { status: 401 }
      );

    const meeting = await prismadb.meeting.findFirst({
      where: {
        voteRoomLink: params.roomVoteId,
      },
    });

    if (!meeting)
      return NextResponse.json(
        {
          message: "Réunion introuvable.",
        },
        { status: 401 }
      );

    const parsed = meetingVoteSchema.safeParse(body);
    const parsedResponse = zodCheckParse(parsed);

    if (!parsedResponse.success)
      return NextResponse.json(
        { message: parsedResponse.error },
        { status: 401 }
      );

    const { note } = body as z.infer<typeof meetingVoteSchema>;

    const meetingVote = await prismadb.meetingVote.create({
      data: {
        note,
        meeting: {
          connect: {
            voteRoomLink: params.roomVoteId,
          },
        },
        user: {
          connect: {
            email: session.user?.email,
          },
        },
      },
    });

    return NextResponse.json({
      meetingVote,
      message: "Meeting créé avec succès !",
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json({ message: internalError }, { status: 500 });
  }
}
