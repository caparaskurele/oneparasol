import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Try a simple database query
    const userCount = await prisma.user.count();
    
    return NextResponse.json(
      {
        status: "ok",
        database: "connected",
        userCount,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Health check error:", error);
    return NextResponse.json(
      {
        status: "error",
        database: "disconnected",
        error: error?.message,
        code: error?.code,
      },
      { status: 500 }
    );
  }
}
