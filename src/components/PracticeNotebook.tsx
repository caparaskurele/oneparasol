'use client';

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface PracticeCell {
  id: string;
  type: 'markdown' | 'python';
  content: string;
}

interface PracticeNotebookProps {
  projectId: string;
}

export default function PracticeNotebook({ projectId }: PracticeNotebookProps) {
  const [cells, setCells] = useState<PracticeCell[]>([
    {
      id: '1',
      type: 'markdown',
      content: '# Practice Notebook\n\nWrite your analysis and code here. Feel free to experiment!',
    },
  ]);

  const [cellOutputs, setCellOutputs] = useState<Record<string, string>>({});

  const addCell = (type: 'markdown' | 'python') => {
    const newCell: PracticeCell = {
      id: Date.now().toString(),
      type,
      content: '',
    };
    setCells([...cells, newCell]);
  };

  const updateCell = (id: string, content: string) => {
    setCells(cells.map((c) => (c.id === id ? { ...c, content } : c)));
  };

  const deleteCell = (id: string) => {
    setCells(cells.filter((c) => c.id !== id));
  };

  const executePythonCell = async (id: string, code: string) => {
    try {
      // Placeholder for code execution
      // In a real implementation, this would send to a backend service
      setCellOutputs((prev) => ({
        ...prev,
        [id]: 'Code execution requires a backend service (Pyodide, Thebe, or custom API)',
      }));
    } catch (error) {
      setCellOutputs((prev) => ({
        ...prev,
        [id]: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      }));
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
        <p className="text-sm text-indigo-900 dark:text-indigo-100">
          💡 <strong>Tip:</strong> Use this notebook to practice alongside the solved project. Type your own code and take notes!
        </p>
      </div>

      <div className="space-y-4">
        {cells.map((cell, index) => (
          <div key={cell.id} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            {/* Cell Type Indicator */}
            <div className="bg-slate-100 dark:bg-slate-700 px-4 py-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 bg-slate-300 dark:bg-slate-600 text-slate-900 dark:text-white rounded text-xs font-bold">
                  {index + 1}
                </span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {cell.type === 'python' ? '🐍 Python' : '📝 Markdown'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newType = cell.type === 'python' ? 'markdown' : 'python';
                    setCells(cells.map((c) => (c.id === cell.id ? { ...c, type: newType } : c)));
                  }}
                  className="text-xs px-3 py-1 bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-300 rounded hover:bg-slate-300 dark:hover:bg-slate-500 transition"
                  title="Toggle cell type"
                >
                  Switch
                </button>
                <button
                  onClick={() => deleteCell(cell.id)}
                  className="text-xs px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-800/50 transition"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Cell Content */}
            {cell.type === 'markdown' ? (
              <div className="p-4">
                <textarea
                  value={cell.content}
                  onChange={(e) => updateCell(cell.id, e.target.value)}
                  placeholder="Write markdown text or notes here..."
                  className="w-full h-32 p-3 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            ) : (
              <div className="p-4">
                <textarea
                  value={cell.content}
                  onChange={(e) => updateCell(cell.id, e.target.value)}
                  placeholder="Write Python code here..."
                  className="w-full h-32 p-3 border border-slate-300 dark:border-slate-600 rounded bg-slate-900 dark:bg-slate-950 text-slate-100 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            {/* Python Cell Actions */}
            {cell.type === 'python' && (
              <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-2 border-t border-slate-200 dark:border-slate-700 flex gap-2">
                <button
                  onClick={() => executePythonCell(cell.id, cell.content)}
                  className="text-sm px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition"
                >
                  ▶ Run
                </button>
                <button
                  onClick={() => {
                    const codeWithNewlines = cell.content.replaceAll('\\n', '\n');
                    navigator.clipboard.writeText(codeWithNewlines);
                  }}
                  className="text-sm px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition"
                >
                  📋 Copy
                </button>
              </div>
            )}

            {/* Output */}
            {cellOutputs[cell.id] && (
              <div className="bg-slate-100 dark:bg-slate-900 p-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">Output:</p>
                <pre className="text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap break-words font-mono">
                  {cellOutputs[cell.id]}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Cell Buttons */}
      <div className="mt-6 flex gap-3 justify-center">
        <button
          onClick={() => addCell('markdown')}
          className="px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600 transition"
        >
          + Add Markdown Cell
        </button>
        <button
          onClick={() => addCell('python')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition"
        >
          + Add Python Cell
        </button>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-400">
        <p className="mb-2">
          <strong>Note:</strong> To execute Python code, you&apos;ll need to set up a backend service. Currently, this is a placeholder.
        </p>
        <p className="text-xs">
          Options: Pyodide (browser-based), Thebe (JupyterHub), or a custom FastAPI backend with a Python execution service.
        </p>
      </div>
    </div>
  );
}
