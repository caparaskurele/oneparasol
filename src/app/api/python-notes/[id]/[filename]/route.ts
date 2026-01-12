import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';

const NOTES_DIR = path.join(process.cwd(), 'data', 'python-notes');

// Get file from a note
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; filename: string } }
) {
  try {
    const { id, filename } = params;
    const filePath = path.join(NOTES_DIR, id, filename);
    
    // Security: prevent directory traversal
    if (!filePath.startsWith(NOTES_DIR)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const buffer = await fs.readFile(filePath);
    
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error fetching file:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}

// Delete file from a note (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; filename: string } }
) {
  try {
    const { id, filename } = params;
    const filePath = path.join(NOTES_DIR, id, filename);
    
    // Security: prevent directory traversal
    if (!filePath.startsWith(NOTES_DIR) || filename === 'meta.json') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await fs.rm(filePath, { force: true });

    // Update metadata
    const indexPath = path.join(NOTES_DIR, `${id}.json`);
    const noteContent = await fs.readFile(indexPath, 'utf-8');
    const note = JSON.parse(noteContent);
    note.files = (note.files || []).filter((f: string) => f !== filename);
    note.updatedAt = new Date().toISOString();
    
    await fs.writeFile(indexPath, JSON.stringify(note, null, 2));
    const metaPath = path.join(NOTES_DIR, id, 'meta.json');
    await fs.writeFile(metaPath, JSON.stringify(note, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json({ error: 'Failed to delete file' }, { status: 500 });
  }
}
