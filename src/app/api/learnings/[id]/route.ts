import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import * as fs from "fs/promises";
import * as path from "path";

const LEARNING_DIR = path.join(process.cwd(), "data", "learnings");

// GET specific learning
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const learning = await prisma.learning.findUnique({
      where: { id: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!learning) {
      return NextResponse.json({ error: "Learning not found" }, { status: 404 });
    }

    return NextResponse.json(learning);
  } catch (error) {
    console.error("Error fetching learning:", error);
    return NextResponse.json(
      { error: "Failed to fetch learning" },
      { status: 500 }
    );
  }
}

// PUT - Update learning
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const learning = await prisma.learning.findUnique({
      where: { id: params.id },
    });

    if (!learning) {
      return NextResponse.json({ error: "Learning not found" }, { status: 404 });
    }

    // Check if user owns this learning
    if (learning.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const topic = formData.get("topic") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const code = formData.get("code") as string;
    const files = formData.getAll("files") as File[];

    const learningDir = path.join(LEARNING_DIR, params.id);
    let currentFiles = JSON.parse(learning.files);

    // Handle new files
    if (files.length > 0) {
      for (const file of files) {
        if (file && file.size > 0) {
          const bytes = await file.arrayBuffer();
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = path.join(learningDir, fileName);
          await fs.writeFile(filePath, Buffer.from(bytes));
          currentFiles.push(fileName);
        }
      }
    }

    // Update learning
    const updatedLearning = await prisma.learning.update({
      where: { id: params.id },
      data: {
        topic: topic || learning.topic,
        title: title || learning.title,
        content: content || learning.content,
        code: code !== undefined ? code : learning.code,
        files: JSON.stringify(currentFiles),
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

    return NextResponse.json(updatedLearning);
  } catch (error) {
    console.error("Error updating learning:", error);
    return NextResponse.json(
      { error: "Failed to update learning" },
      { status: 500 }
    );
  }
}

// DELETE - Delete learning
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const learning = await prisma.learning.findUnique({
      where: { id: params.id },
    });

    if (!learning) {
      return NextResponse.json({ error: "Learning not found" }, { status: 404 });
    }

    // Check if user owns this learning
    if (learning.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Delete files
    const learningDir = path.join(LEARNING_DIR, params.id);
    await fs.rm(learningDir, { recursive: true, force: true });

    // Deduct points (10 points)
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        totalPoints: {
          decrement: 10,
        },
      },
    });

    // Delete learning record
    await prisma.learning.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting learning:", error);
    return NextResponse.json(
      { error: "Failed to delete learning" },
      { status: 500 }
    );
  }
}
