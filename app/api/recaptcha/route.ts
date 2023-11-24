import { internalError } from "@/global-message";
import { fetchCustom } from "@/lib/fetch-custom";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { captchaValue } = await request.json();

    if (!captchaValue)
      return NextResponse.json(
        {
          success: false,
          message: "No captchaValue in body",
        },
        { status: 401 }
      );

    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env
        .RECAPTCHA_SECRET_KEY!}&response=${captchaValue}`,
      { method: "POST" }
    );
    const data: {
      success: boolean;
      challenge_ts: Date;
      hostname: string;
    } = await response.json();
    console.log(data);

    if (data.success) {
      return NextResponse.json({
        success: true,
        message: "Captcha OK",
      });
    }
    return NextResponse.json(
      {
        success: false,
        message: "Captcha KO",
      },
      { status: 401 }
    );
  } catch (e) {
    console.log(e);

    return NextResponse.json({ message: internalError }, { status: 500 });
  }
}
