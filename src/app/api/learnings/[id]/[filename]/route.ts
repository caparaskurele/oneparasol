import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import * as fs from "fs/promises";
import * as path from "path";

const LEARNING_DIR = path.join(process.cwd(), "data", "learnings");

// GET - Download file
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; filename: string } }
) {
  try {
    const { id, filename } = params;
    const filePath = path.join(LEARNING_DIR, id, filename);

    // Security: prevent directory traversal
    if (!filePath.startsWith(LEARNING_DIR)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const buffer = await fs.readFile(filePath);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}

// DELETE - Delete file
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; filename: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, filename } = params;

    // Verify ownership
    const learning = await prisma.learning.findUnique({
      where: { id },
    });

    if (!learning || learning.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const filePath = path.join(LEARNING_DIR, id, filename);

    // Security check
    if (!filePath.startsWith(LEARNING_DIR)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await fs.rm(filePath, { force: true });

    // Update files list
    const currentFiles = JSON.parse(learning.files);
    const updatedFiles = currentFiles.filter((f: string) => f !== filename);

    await prisma.learning.update({
      where: { id },
      data: {
        files: JSON.stringify(updatedFiles),
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
