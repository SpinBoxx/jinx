import { auth } from "@/auth";
import { internalError } from "@/global-message";
import prismadb from "@/lib/prismadb";
import { zodCheckParse } from "@/services/utils";
import { meetingSchema } from "@/types/meeting";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: Request) {
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
    console.log(session);

    const parsed = meetingSchema.safeParse(body);
    const parsedResponse = zodCheckParse(parsed);

    if (!parsedResponse.success)
      return NextResponse.json(
        { message: parsedResponse.error },
        { status: 401 }
      );

    const { title, description, when, hours, minutes, participants } =
      body as z.infer<typeof meetingSchema>;

    const newBody = {
      title,
      description,
      when,
      participants,
    };

    const newMeeting = await prismadb.meeting.create({
      data: {
        ...newBody,
        creator: {
          connect: {
            email: session.user?.email,
          },
        },
      },
    });

    return NextResponse.json({
      newMeeting,
      message: "Meeting créé avec succès !",
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json({ message: internalError }, { status: 500 });
  }
}
