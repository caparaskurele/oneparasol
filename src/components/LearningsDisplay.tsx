'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import LearningForm from '@/components/LearningForm';

interface Learning {
  id: string;
  userId: string;
  topic: string;
  title: string;
  content: string;
  code: string;
  files: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

export default function LearningsDisplay() {
  const { data: session } = useSession();
  const router = useRouter();
  const [learnings, setLearnings] = useState<Learning[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [editingLearning, setEditingLearning] = useState<Learning | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const topics = ['all', 'Python', 'SQL', 'Excel', 'Power BI', 'General Learning'];

  const fetchLearnings = useCallback(async () => {
    try {
      setIsLoading(true);
      let url = '/api/learnings';
      if (selectedTopic !== 'all') {
        url += `?topic=${selectedTopic}`;
      }
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setLearnings(data);
      }
    } catch (error) {
      console.error('Error fetching learnings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic]);

  useEffect(() => {
    fetchLearnings();
  }, [fetchLearnings]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this learning?')) return;

    try {
      const response = await fetch(`/api/learnings/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setLearnings(learnings.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (!session?.user) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-center">
        <p className="text-blue-900 dark:text-blue-100 mb-4">
          Please sign in to view and share learnings
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

  return (
    <div className="max-w-6xl mx-auto">
      {!showForm ? (
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition mb-8 w-full"
        >
          + Share Your Learning (Earn 10 Points!)
        </button>
      ) : (
        <div className="mb-8">
          <LearningForm
            onSuccess={() => {
              setShowForm(false);
              setEditingLearning(null);
              fetchLearnings();
            }}
            editingLearning={editingLearning}
          />
          <button
            onClick={() => {
              setShowForm(false);
              setEditingLearning(null);
            }}
            className="text-slate-600 dark:text-slate-400 hover:text-slate-900 text-sm"
          >
            ← Cancel
          </button>
        </div>
      )}

      {/* Topic Filter */}
      <div className="mb-6 flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedTopic(t)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedTopic === t
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            {t === 'all' ? 'All Topics' : t}
          </button>
        ))}
      </div>

      {/* Learnings List */}
      {isLoading ? (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">Loading learnings...</p>
        </div>
      ) : learnings.length === 0 ? (
        <div className="text-center py-12 bg-slate-50 dark:bg-slate-900 rounded-lg">
          <p className="text-slate-600 dark:text-slate-400">No learnings shared yet in this topic.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {learnings.map((learning) => (
            <div
              key={learning.id}
              className="bg-white dark:bg-slate-900 rounded-lg shadow-lg overflow-hidden border border-slate-200 dark:border-slate-800"
            >
              <div
                className="p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                onClick={() => setExpandedId(expandedId === learning.id ? null : learning.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-full">
                        {learning.topic}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {learning.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                      By {learning.user.name} • {formatDate(learning.createdAt)}
                    </p>
                  </div>

                  {session.user?.id === learning.userId && (
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingLearning(learning);
                          setShowForm(true);
                        }}
                        className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 p-2 rounded transition"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(learning.id);
                        }}
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded transition"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {expandedId === learning.id && (
                <div className="border-t border-slate-200 dark:border-slate-800 p-6 bg-slate-50 dark:bg-slate-800/50">
                  <div className="mb-6">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                      📝 Learning Notes:
                    </h4>
                    <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 p-4 rounded whitespace-pre-wrap break-words">
                      {learning.content}
                    </div>
                  </div>

                  {learning.code && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                        💻 Code:
                      </h4>
                      <pre className="bg-slate-900 dark:bg-black text-slate-100 p-4 rounded overflow-x-auto">
                        <code>{learning.code}</code>
                      </pre>
                    </div>
                  )}

                  {learning.files && JSON.parse(learning.files).length > 0 && (
                    <div>
                      <h4 className="font-semibold text-slate-900 dark:text-white mb-3">
                        📎 Files:
                      </h4>
                      <div className="space-y-2">
                        {JSON.parse(learning.files).map((file: string) => (
                          <a
                            key={file}
                            href={`/api/learnings/${learning.id}/${file}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 bg-slate-100 dark:bg-slate-700 p-3 rounded hover:bg-slate-200"
                          >
                            📥 {file}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
