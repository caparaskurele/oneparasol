import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';

const NOTES_DIR = path.join(process.cwd(), 'data', 'python-notes');

// Get specific note
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const noteId = params.id;
    const indexPath = path.join(NOTES_DIR, `${noteId}.json`);
    
    const content = await fs.readFile(indexPath, 'utf-8');
    const note = JSON.parse(content);

    return NextResponse.json(note);
  } catch (error) {
    console.error('Error fetching note:', error);
    return NextResponse.json({ error: 'Note not found' }, { status: 404 });
  }
}

// Update note (only students can modify their own)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const noteId = params.id;
    const formData = await request.formData();
    const studentName = formData.get('studentName') as string;
    const content = formData.get('content') as string;
    const pythonCode = formData.get('pythonCode') as string;
    const files = formData.getAll('files') as File[];
    const isAdminDelete = formData.get('adminDelete') === 'true';

    // Admin delete
    if (isAdminDelete) {
      const noteDir = path.join(NOTES_DIR, noteId);
      await fs.rm(noteDir, { recursive: true, force: true });
      const indexPath = path.join(NOTES_DIR, `${noteId}.json`);
      await fs.rm(indexPath, { force: true });
      return NextResponse.json({ success: true });
    }

    const indexPath = path.join(NOTES_DIR, `${noteId}.json`);
    const noteContent = await fs.readFile(indexPath, 'utf-8');
    const note = JSON.parse(noteContent);

    // Update content
    note.content = content || note.content;
    note.pythonCode = pythonCode || note.pythonCode;
    note.updatedAt = new Date().toISOString();

    // Handle new files
    if (files.length > 0) {
      const noteDir = path.join(NOTES_DIR, noteId);
      const savedFiles = note.files || [];

      for (const file of files) {
        if (file && file.size > 0) {
          const bytes = await file.arrayBuffer();
          const fileName = `${Date.now()}-${file.name}`;
          const filePath = path.join(noteDir, fileName);
          await fs.writeFile(filePath, Buffer.from(bytes));
          savedFiles.push(fileName);
        }
      }

      note.files = savedFiles;
    }

    // Save updated note
    await fs.writeFile(indexPath, JSON.stringify(note, null, 2));
    const metaPath = path.join(NOTES_DIR, noteId, 'meta.json');
    await fs.writeFile(metaPath, JSON.stringify(note, null, 2));

    return NextResponse.json(note);
  } catch (error) {
    console.error('Error updating note:', error);
    return NextResponse.json({ error: 'Failed to update note' }, { status: 500 });
  }
}

// Delete note (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const noteId = params.id;
    const noteDir = path.join(NOTES_DIR, noteId);
    const indexPath = path.join(NOTES_DIR, `${noteId}.json`);

    await fs.rm(noteDir, { recursive: true, force: true });
    await fs.rm(indexPath, { force: true });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting note:', error);
    return NextResponse.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}
