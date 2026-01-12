import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs/promises';
import * as path from 'path';

// Define the notes data directory
const NOTES_DIR = path.join(process.cwd(), 'data', 'python-notes');

// Ensure directory exists
async function ensureDir() {
  try {
    await fs.mkdir(NOTES_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
  }
}

// Get all notes
export async function GET() {
  try {
    await ensureDir();
    
    const files = await fs.readdir(NOTES_DIR);
    const notes = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const filePath = path.join(NOTES_DIR, file);
        const content = await fs.readFile(filePath, 'utf-8');
        notes.push(JSON.parse(content));
      }
    }

    // Sort by date descending (latest first)
    notes.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json({ error: 'Failed to fetch notes' }, { status: 500 });
  }
}

// Create a new note
export async function POST(request: NextRequest) {
  try {
    await ensureDir();
    
    const formData = await request.formData();
    const studentName = formData.get('studentName') as string;
    const content = formData.get('content') as string;
    const pythonCode = formData.get('pythonCode') as string;
    const files = formData.getAll('files') as File[];

    if (!studentName || !content) {
      return NextResponse.json(
        { error: 'Student name and content are required' },
        { status: 400 }
      );
    }

    const noteId = Date.now().toString();
    const noteDir = path.join(NOTES_DIR, noteId);
    await fs.mkdir(noteDir, { recursive: true });

    // Save uploaded files
    const savedFiles: string[] = [];
    for (const file of files) {
      if (file && file.size > 0) {
        const bytes = await file.arrayBuffer();
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = path.join(noteDir, fileName);
        await fs.writeFile(filePath, Buffer.from(bytes));
        savedFiles.push(fileName);
      }
    }

    // Create note metadata
    const note = {
      id: noteId,
      studentName,
      content,
      pythonCode: pythonCode || '',
      files: savedFiles,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save note metadata
    const metaPath = path.join(noteDir, 'meta.json');
    await fs.writeFile(metaPath, JSON.stringify(note, null, 2));

    // Also save a copy in root for easier listing
    const indexPath = path.join(NOTES_DIR, `${noteId}.json`);
    await fs.writeFile(indexPath, JSON.stringify(note, null, 2));

    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
  }
}
