import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sanitize input
function sanitizeInput(input: string): string {
  return input.trim().slice(0, 500);
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, password } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = sanitizeInput(email).toLowerCase();
    const sanitizedPassword = password; // Don't trim password to preserve intentional spaces

    // Validate email format
    if (!EMAIL_REGEX.test(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate name length
    if (sanitizedName.length < 2 || sanitizedName.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters" },
        { status: 400 }
      );
    }

    // Validate password strength
    if (sanitizedPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (sanitizedPassword.length > 128) {
      return NextResponse.json(
        { error: "Password is too long" },
        { status: 400 }
      );
    }

    // Check if user already exists
    let existingUser;
    try {
      existingUser = await prisma.user.findUnique({
        where: { email: sanitizedEmail },
      });

      if (existingUser) {
        return NextResponse.json(
          { error: "Email already registered. Please sign in instead." },
          { status: 400 }
        );
      }
    } catch (dbError: any) {
      console.error("Database lookup error:", dbError);
      console.error("Error details:", {
        message: dbError?.message,
        code: dbError?.code,
        meta: dbError?.meta,
      });
      return NextResponse.json(
        { error: "Database connection error. Please try again later." },
        { status: 500 }
      );
    }

    // Hash password with salt rounds
    let hashedPassword: string;
    try {
      hashedPassword = await bcrypt.hash(sanitizedPassword, 12);
    } catch (hashError) {
      console.error("Password hashing error:", hashError);
      return NextResponse.json(
        { error: "Failed to process password. Please try again." },
        { status: 500 }
      );
    }

    // Create user in database
    try {
      const user = await prisma.user.create({
        data: {
          name: sanitizedName,
          email: sanitizedEmail,
          password: hashedPassword,
          totalPoints: 0,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });

      return NextResponse.json(
        {
          message: "Account created successfully! Please sign in.",
          user,
        },
        { status: 201 }
      );
    } catch (createError: any) {
      console.error("User creation error:", createError);
      console.error("Error details:", {
        message: createError?.message,
        code: createError?.code,
        meta: createError?.meta,
      });
      // Check if error is due to unique constraint
      if (createError?.code === "P2002") {
        return NextResponse.json(
          { error: "Email already registered. Please sign in." },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { error: "Failed to create account. Please try again." },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
