import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import * as fs from "fs/promises";
import * as path from "path";

const LEARNING_DIR = path.join(process.cwd(), "data", "learnings");

// Ensure directory exists
async function ensureDir() {
  try {
    await fs.mkdir(LEARNING_DIR, { recursive: true });
  } catch (error) {
    console.error("Error creating directory:", error);
  }
}

// GET all learnings (public, sorted by latest)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const topic = searchParams.get("topic");
    const userId = searchParams.get("userId");

    let query: any = {
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    };

    // Filter by topic if provided
    if (topic && topic !== "all") {
      query.where = { ...query.where, topic };
    }

    // Filter by userId if provided
    if (userId) {
      query.where = { ...query.where, userId };
    }

    const learnings = await prisma.learning.findMany(query);

    return NextResponse.json(learnings);
  } catch (error) {
    console.error("Error fetching learnings:", error);
    return NextResponse.json(
      { error: "Failed to fetch learnings" },
      { status: 500 }
    );
  }
}

// POST - Create new learning
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await ensureDir();

    const formData = await request.formData();
    const topic = formData.get("topic") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const code = formData.get("code") as string;
    const files = formData.getAll("files") as File[];

    if (!topic || !title || !content) {
      return NextResponse.json(
        { error: "Topic, title, and content are required" },
        { status: 400 }
      );
    }

    const learningId = Date.now().toString();
    const learningDir = path.join(LEARNING_DIR, learningId);
    await fs.mkdir(learningDir, { recursive: true });

    // Save uploaded files
    const savedFiles: string[] = [];
    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(learningDir, fileName);
        await fs.writeFile(filePath, Buffer.from(bytes));
        savedFiles.push(fileName);
      }
    }

    // Create learning record
    const learning = await prisma.learning.create({
      data: {
        userId: session.user.id,
        topic,
        title,
        content,
        code: code || "",
        files: JSON.stringify(savedFiles),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Award points (10 points per learning)
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        totalPoints: {
          increment: 10,
        },
      },
    });

    return NextResponse.json(learning, { status: 201 });
  } catch (error) {
    console.error("Error creating learning:", error);
    return NextResponse.json(
      { error: "Failed to create learning" },
      { status: 500 }
    );
  }
}
