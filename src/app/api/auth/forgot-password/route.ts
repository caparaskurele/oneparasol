import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // For security, don't reveal if email exists
      return NextResponse.json(
        { message: "If email exists, password reset link will be sent" },
        { status: 200 }
      );
    }

    // Send OTP for password reset
    const response = await fetch(new URL("/api/auth/send-otp", request.url), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        userId: user.id,
        type: "password-reset",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send OTP");
    }

    return NextResponse.json(
      {
        message: "Password reset OTP sent to email",
        userId: user.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to process password reset request" },
      { status: 500 }
    );
  }
}
