'use client';

import { useState, useEffect } from 'react';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import StudentNoteForm from '@/components/StudentNoteForm';

interface Note {
  id: string;
  studentName: string;
  content: string;
  pythonCode: string;
  files: string[];
  createdAt: string;
  updatedAt: string;
}

export default function PythonNotesDisplay() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [expandedNoteId, setExpandedNoteId] = useState<string | null>(null);
  const [isAdmin] = useState(false); // Set to true when user is authenticated as admin
  const [showForm, setShowForm] = useState(false);

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/python-notes');
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleteNote = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/python-notes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes(notes.filter(note => note.id !== id));
      } else {
        alert('Failed to delete note');
      }
    } catch (error) {
      console.error('Error deleting note:', error);
      alert('Error deleting note');
    }
  };

  const handleDeleteFile = async (noteId: string, fileName: string) => {
    if (!window.confirm('Delete this file?')) {
      return;
    }

    try {
      const response = await fetch(`/api/python-notes/${noteId}/${fileName}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNotes(notes.map(note => 
          note.id === noteId 
            ? { ...note, files: note.files.filter(f => f !== fileName) }
            : note
        ));
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isToday = date.toDateString() === today.toDateString();
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const timeString = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
    const dateOnlyString = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });

    if (isToday) return `Today at ${timeString}`;
    if (isYesterday) return `Yesterday at ${timeString}`;
    return `${dateOnlyString} at ${timeString}`;
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext || '')) return '🖼️';
    if (['mp4', 'webm', 'mov', 'avi'].includes(ext || '')) return '🎬';
    if (['pdf'].includes(ext || '')) return '📄';
    if (['doc', 'docx'].includes(ext || '')) return '📝';
    return '📎';
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Show Form - Toggle Button */}
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition mb-8 w-full"
        >
          + Add Your Learning Notes
        </button>
      ) : (
        <div className="mb-8">
          <StudentNoteForm 
            onSuccess={() => {
              setShowForm(false);
              setEditingNote(null);
              fetchNotes();
            }}
            editingNote={editingNote}
          />
          <button
            onClick={() => {
              setShowForm(false);
              setEditingNote(null);
            }}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm"
          >
            ← Cancel
          </button>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="text-slate-600 dark:text-slate-400 mt-4">Loading notes...</p>
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No learning notes yet. Be the first to share! 📚
            </p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition"
            >
              {/* Header */}
              <div 
                className="p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                onClick={() => setExpandedNoteId(expandedNoteId === note.id ? null : note.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {note.studentName}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {formatDate(note.createdAt)}
                      {note.updatedAt !== note.createdAt && (
                        <span> (Updated {formatDate(note.updatedAt)})</span>
                      )}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingNote(note);
                        setShowForm(true);
                      }}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 p-2 rounded hover:bg-indigo-50 dark:hover:bg-indigo-900/30"
                      title="Edit this note"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteNote(note.id);
                        }}
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 p-2 rounded hover:bg-red-50 dark:hover:bg-red-900/30"
                        title="Delete this note (Admin only)"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Content */}
              {expandedNoteId === note.id && (
                <div className="border-t border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-800/50">
                  {/* Main Content */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                      📝 Learning Notes:
                    </h4>
                    <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-4 rounded border border-slate-200 dark:border-slate-700 whitespace-pre-wrap break-words">
                      {note.content}
                    </div>
                  </div>

                  {/* Python Code */}
                  {note.pythonCode && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                        🐍 Python Code:
                      </h4>
                      <pre className="bg-slate-900 dark:bg-black text-slate-100 p-4 rounded overflow-x-auto border border-slate-700">
                        <code>{note.pythonCode}</code>
                      </pre>
                    </div>
                  )}

                  {/* Attached Files */}
                  {note.files.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                        📎 Attached Files ({note.files.length}):
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {note.files.map((fileName) => (
                          <div
                            key={fileName}
                            className="flex items-center justify-between bg-white dark:bg-slate-900 p-3 rounded border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition"
                          >
                            <a
                              href={`/api/python-notes/${note.id}/${fileName}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex-1"
                            >
                              <span className="text-lg">{getFileIcon(fileName)}</span>
                              <span className="truncate">{fileName}</span>
                            </a>
                            {isAdmin && (
                              <button
                                onClick={() => handleDeleteFile(note.id, fileName)}
                                className="text-red-600 dark:text-red-400 hover:text-red-700 ml-2 p-1"
                                title="Delete file"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Preview Line */}
              {expandedNoteId !== note.id && (
                <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400 truncate">
                  {note.content.substring(0, 100)}...
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
