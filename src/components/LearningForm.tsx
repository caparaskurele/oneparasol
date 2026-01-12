'use client';

import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { XMarkIcon } from '@heroicons/react/24/solid';

interface LearningFormProps {
  onSuccess: () => void;
  editingLearning?: any | null;
}

export default function LearningForm({ onSuccess, editingLearning }: LearningFormProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [topic, setTopic] = useState(editingLearning?.topic || 'Python');
  const [title, setTitle] = useState(editingLearning?.title || '');
  const [content, setContent] = useState(editingLearning?.content || '');
  const [code, setCode] = useState(editingLearning?.code || '');
  const [files, setFiles] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>(editingLearning?.files ? JSON.parse(editingLearning.files) : []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const topics = ['Python', 'SQL', 'Excel', 'Power BI', 'General Learning'];

  if (!session?.user) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
        <p className="text-blue-900 dark:text-blue-100 mb-4">
          Please sign in to share your learning
        </p>
        <button
          onClick={() => router.push('/signin')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Sign In
        </button>
      </div>
    );
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (fileName: string) => {
    setSelectedFiles(selectedFiles.filter(f => f !== fileName));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('topic', topic);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('code', code);

      files.forEach(file => {
        formData.append('files', file);
      });

      const url = editingLearning 
        ? `/api/learnings/${editingLearning.id}`
        : '/api/learnings';

      const method = editingLearning ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to save');
      }

      setTopic('Python');
      setTitle('');
      setContent('');
      setCode('');
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
        {editingLearning ? 'Update Your Learning' : 'Share Your Learning'}
      </h2>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {/* Topic Selection */}
        <div>
          <label htmlFor="topic" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Select Topic *
          </label>
          <select
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Learning Title *
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="e.g., How to Open Files in Google Colab"
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            What Did You Learn? *
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Describe your learning, tips, observations, and insights..."
            rows={6}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Code */}
        <div>
          <label htmlFor="code" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Code (Optional)
          </label>
          <textarea
            id="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code with comments..."
            rows={6}
            className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-sm dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Files */}
        <div>
          <label htmlFor="files" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Upload Files (Optional)
          </label>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-500 transition">
            <input
              type="file"
              id="files"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*,video/*,.pdf,.doc,.docx,.py"
              className="hidden"
            />
            <label htmlFor="files" className="cursor-pointer">
              <p className="text-slate-600 dark:text-slate-400">
                Click to upload images, videos, or files
              </p>
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-4 space-y-2">
              {files.map((file, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800 p-3 rounded">
                  {file.name}
                </div>
              ))}
            </div>
          )}

          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Attached:</p>
              <div className="space-y-2">
                {selectedFiles.map((fileName) => (
                  <div key={fileName} className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded">
                    <span className="text-sm">{fileName}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(fileName)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-400 text-white font-semibold py-3 px-6 rounded-lg transition w-full"
        >
          {isLoading ? 'Saving...' : (editingLearning ? 'Update Learning' : 'Share Learning (Earn 10 Points!)')}
        </button>
      </div>
    </form>
  );
}
