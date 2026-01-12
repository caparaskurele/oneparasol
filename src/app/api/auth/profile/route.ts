import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

// GET user profile (current logged-in user)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        learnings: {
          select: {
            id: true,
            topic: true,
            title: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Calculate medal based on points
    let medal = null;
    if (user.totalPoints >= 1000) {
      medal = "Platinum";
    } else if (user.totalPoints >= 500) {
      medal = "Gold";
    } else if (user.totalPoints >= 100) {
      medal = "Silver";
    }

    // Count learnings by topic
    const topicCounts = user.learnings.reduce((acc: any, learning: any) => {
      acc[learning.topic] = (acc[learning.topic] || 0) + 1;
      return acc;
    }, {});

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      totalPoints: user.totalPoints,
      medal,
      totalLearnings: user.learnings.length,
      topicCounts,
      learnings: user.learnings,
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
