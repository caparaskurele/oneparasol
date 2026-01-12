'use client';

import { useState, useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface Note {
  id: string;
  studentName: string;
  content: string;
  pythonCode: string;
  files: string[];
  createdAt: string;
  updatedAt: string;
}

interface StudentNoteFormProps {
  onSuccess: () => void;
  editingNote?: Note | null;
}

export default function StudentNoteForm({ onSuccess, editingNote }: StudentNoteFormProps) {
  const [studentName, setStudentName] = useState(editingNote?.studentName || '');
  const [content, setContent] = useState(editingNote?.content || '');
  const [pythonCode, setPythonCode] = useState(editingNote?.pythonCode || '');
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>(editingNote?.files || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeSelectedFile = (fileName: string) => {
    setSelectedFiles(selectedFiles.filter(f => f !== fileName));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('studentName', studentName);
      formData.append('content', content);
      formData.append('pythonCode', pythonCode);

      // Add new files
      files.forEach(file => {
        formData.append('files', file);
      });

      const url = editingNote 
        ? `/api/python-notes/${editingNote.id}`
        : '/api/python-notes';

      const method = editingNote ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || `Failed to ${editingNote ? 'update' : 'create'} note`);
      }

      // Reset form
      setStudentName('');
      setContent('');
      setPythonCode('');
      setFiles([]);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        {editingNote ? 'Update Your Learning Notes' : 'Share Your Learning'}
      </h2>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* Student Name */}
        <div>
          <label htmlFor="studentName" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Your Name *
          </label>
          <input
            type="text"
            id="studentName"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
            placeholder="Enter your name"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Main Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            What Did You Learn? (Text & Observations) *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Describe what you learned, observations, insights, tips, or how to do something..."
            rows={6}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Python Code */}
        <div>
          <label htmlFor="pythonCode" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Python Code (Optional)
          </label>
          <textarea
            id="pythonCode"
            value={pythonCode}
            onChange={(e) => setPythonCode(e.target.value)}
            placeholder="Paste your Python code here with comments explaining what it does..."
            rows={8}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* File Upload */}
        <div>
          <label htmlFor="files" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Upload Images, Videos, or Files (Optional)
          </label>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition">
            <input
              type="file"
              id="files"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx"
              className="hidden"
            />
            <label htmlFor="files" className="cursor-pointer">
              <p className="text-slate-600 dark:text-slate-400">
                Click to upload images, videos, or files
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                Supported: Images (JPG, PNG, GIF), Videos (MP4, WebM), PDFs, Documents
              </p>
            </label>
          </div>

          {/* Selected Files Display */}
          {files.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                New Files to Upload ({files.length}):
              </p>
              <div className="space-y-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-slate-50 dark:bg-slate-800 p-3 rounded">
                    <span className="text-sm text-slate-600 dark:text-slate-400">{file.name}</span>
                    <span className="text-xs text-slate-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Existing Files (when editing) */}
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Attached Files:
              </p>
              <div className="space-y-2">
                {selectedFiles.map((fileName) => (
                  <div key={fileName} className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded">
                    <span className="text-sm text-slate-600 dark:text-slate-300">{fileName}</span>
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(fileName)}
                      className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-semibold py-3 px-6 rounded-lg transition w-full"
        >
          {isLoading ? 'Saving...' : editingNote ? 'Update Notes' : 'Share Learning'}
        </button>
      </div>
    </form>
  );
}
