import { internalError } from "@/global-message";
import prismadb from "@/lib/prismadb";
import { registerSchema } from "@/lib/zod-schema-helper";
import { zodCheckParse } from "@/services/utils";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { email, password, username } = body;

    const parsed = registerSchema.safeParse(body);
    const parsedResponse = zodCheckParse(parsed);

    if (!parsedResponse.success)
      return NextResponse.json(
        { message: parsedResponse.error },
        { status: 401 }
      );

    const userAlreadyExist = await prismadb.user.findFirst({
      where: {
        email,
      },
    });

    if (userAlreadyExist)
      return NextResponse.json(
        {
          message:
            "L'utilisateur existe déjà. Veuillez réessayer avec une autre adresse email.",
        },
        { status: 401 }
      );
    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await prismadb.user.create({
      data: { ...body, password: hashedPassword },
    });

    return NextResponse.json({
      user,
      message: "Utilisateur créé avec success !",
    });
  } catch (e) {
    return NextResponse.json({ message: internalError }, { status: 500 });
  }
}
