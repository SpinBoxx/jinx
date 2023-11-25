import { customModelChatGPTSchema } from "@/app/(root)/mes-preferences/components/chatgpt-form";
import { internalError } from "@/global-message";
import prismadb from "@/lib/prismadb";
import { zodCheckParse } from "@/services/utils";
import { NextResponse } from "next/server";
import { z } from "zod";

interface Params {
  params: {
    userId: string;
  };
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const { userId } = params;
    if (!userId)
      return NextResponse.json(
        {
          message: "User id introuvable. Veuillez rafraichir la page",
        },
        { status: 401 }
      );

    const user = await prismadb.user.findFirst({
      where: {
        id: Number(userId),
      },
    });

    if (!user)
      return NextResponse.json(
        {
          message: "User introuvable. Veuillez rafraichir la page",
        },
        { status: 401 }
      );
    const body = await request.json();

    const userUpdated = await prismadb.user.update({
      where: {
        id: user.id,
      },
      data: { ...body },
    });

    return NextResponse.json({
      userUpdated,
      message: "Modification effectué avec succès !",
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: internalError,
      },
      { status: 500 }
    );
  }
}
