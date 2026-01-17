import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

// Initialize email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate random OTP
function generateOTP(length: number = 6): string {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits.charAt(Math.floor(Math.random() * 10));
  }
  return otp;
}

export async function POST(request: NextRequest) {
  try {
    const { email, userId, type } = await request.json();

    if (!email || !userId) {
      return NextResponse.json(
        { error: "Email and userId are required" },
        { status: 400 }
      );
    }

    // Generate OTP
    const code = generateOTP(6);
    const expiresAt = new Date(
      Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES || "10") * 60 * 1000)
    );

    // Save OTP to database
    await prisma.oTPToken.create({
      data: {
        userId,
        email,
        code,
        expiresAt,
        verified: false,
      },
    });

    // Send email
    const emailSubject =
      type === "password-reset"
        ? "OneParasol - Password Reset OTP"
        : "OneParasol - Email Verification OTP";

    const emailHtml =
      type === "password-reset"
        ? `
        <h2>Password Reset Request</h2>
        <p>We received a request to reset your password.</p>
        <p><strong>Your OTP Code:</strong> <h1 style="color: #4f46e5; font-size: 32px; letter-spacing: 5px;">${code}</h1></p>
        <p>This OTP will expire in ${process.env.OTP_EXPIRY_MINUTES} minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
        : `
        <h2>Verify Your Email Address</h2>
        <p>Welcome to OneParasol! Please verify your email to activate your account.</p>
        <p><strong>Your OTP Code:</strong> <h1 style="color: #4f46e5; font-size: 32px; letter-spacing: 5px;">${code}</h1></p>
        <p>This OTP will expire in ${process.env.OTP_EXPIRY_MINUTES} minutes.</p>
        <p>If you didn't sign up for OneParasol, please ignore this email.</p>
      `;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: emailSubject,
      html: emailHtml,
    });

    return NextResponse.json(
      { message: "OTP sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
