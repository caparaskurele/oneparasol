'use client';

import { useState } from 'react';
import { ProjectCell } from '@/data/projects';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface NotebookCellProps {
  cell: ProjectCell;
  explanation?: string;
  cellNumber: number;
}

export default function NotebookCell({ cell, explanation, cellNumber }: NotebookCellProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (cell.type === 'markdown') {
    return (
      <div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg p-6 mb-4">
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {cell.content}
          </ReactMarkdown>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden mb-4">
      {/* Header */}
      <div className="bg-slate-100 dark:bg-slate-700 px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-600 transition"
        onClick={() => setIsCollapsed(!isCollapsed)}>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-6 h-6 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs font-bold">
            {cellNumber}
          </span>
          <span className="font-semibold text-slate-900 dark:text-white">Python Code</span>
        </div>
        <span className="text-slate-600 dark:text-slate-400">
          {isCollapsed ? '▶' : '▼'}
        </span>
      </div>

      {/* Content */}
      {!isCollapsed && (
        <>
          {/* Code Section */}
          <div className="bg-slate-900 dark:bg-slate-950 text-slate-100 p-6 font-mono text-sm overflow-x-auto">
            <pre>{cell.content}</pre>
          </div>

          {/* Explanation Section */}
          {explanation && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-slate-200 dark:border-slate-700 px-6 py-4">
              <div className="flex gap-3">
                <span className="text-2xl flex-shrink-0">💡</span>
                <div className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  <p className="font-semibold text-blue-900 dark:text-blue-300 mb-2">Why this code?</p>
                  {explanation}
                </div>
              </div>
            </div>
          )}

          {/* Copy Button */}
          <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-3 border-t border-slate-200 dark:border-slate-700 flex justify-end">
            <button
              onClick={() => {
                navigator.clipboard.writeText(cell.content);
              }}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline font-semibold transition"
            >
              📋 Copy Code
            </button>
          </div>
        </>
      )}
    </div>
  );
}
