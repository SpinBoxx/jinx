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

    const meetingUpdated = await prismadb.meeting.update({
      where: {
        id: meeting.id,
      },
      data: {
        showGaugeInVoteRoom: !meeting.showGaugeInVoteRoom,
      },
    });
    const activatedMessage =
      "Vous avez activé l'affichage de la jauge dans le salon de vote";
    const disactivatedMessage =
      "Vous avez désactivé l'affichage de la jauge dans le salon de vote";

    return NextResponse.json({
      message: meetingUpdated.showGaugeInVoteRoom
        ? activatedMessage
        : disactivatedMessage,
    });
  } catch (e) {
    console.log(e);

    return NextResponse.json(
      {
        message: internalError,
        error: e,
      },
      { status: 500 }
    );
  }
}
