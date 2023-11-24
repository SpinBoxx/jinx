import { internalError } from "@/global-message";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

interface Params {
  params: {
    meetingId: string;
  };
}

export async function GET(request: Request, { params }: Params) {
  try {
    const { meetingId } = params;
    if (!meetingId)
      return NextResponse.json(
        {
          message: "Meeting introuvable. Veuillez rafraichir la page",
        },
        { status: 401 }
      );

    const meeting = await prismadb.meeting.findFirst({
      where: {
        id: Number(meetingId),
      },
    });
    if (!meeting)
      return NextResponse.json(
        {
          message: "Meeting introuvable. Veuillez rafraichir la page",
        },
        { status: 401 }
      );
    return NextResponse.json({ meeting });
  } catch (e) {
    return NextResponse.json(
      {
        message: internalError,
      },
      { status: 500 }
    );
  }
}
