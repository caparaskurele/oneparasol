'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { projects } from '@/data/projects';
import NotebookCell from '@/components/NotebookCell';
import PracticeNotebook from '@/components/PracticeNotebook';

export default function ProjectPage({ params }: { params: { projectId: string } }) {
  const project = projects.find((p) => p.id === params.projectId);
  const [activeTab, setActiveTab] = useState<'side-by-side' | 'solved' | 'practice'>('side-by-side');

  if (!project) {
    return (
      <Container>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Project Not Found
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              The project you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href="/python/projects"
              className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/python/projects"
              className="text-indigo-600 dark:text-indigo-400 hover:underline mb-4 inline-block"
            >
              ← Back to Projects
            </Link>

            <h1 className="text-4xl font-bold text-slate-900 dark:text-white text-center mb-4">
              {project.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold">
                {project.category}
              </span>
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold">
                {project.difficulty}
              </span>
            </div>

            {/* Dataset Section */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-6 mb-8 border border-slate-200 dark:border-slate-700">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    📊 Dataset: {project.datasetName}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {project.description}
                  </p>
                </div>
                <a
                  href={project.datasetUrl}
                  download
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition whitespace-nowrap"
                >
                  ⬇ Download Dataset
                </a>
              </div>
            </div>
          </div>

          {/* View Mode Tabs - Mobile Only */}
          <div className="md:hidden mb-6 flex gap-2 border-b border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setActiveTab('side-by-side')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === 'side-by-side'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400'
              }`}
            >
              Side by Side
            </button>
            <button
              onClick={() => setActiveTab('solved')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === 'solved'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400'
              }`}
            >
              Solved
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-4 py-2 font-semibold border-b-2 transition ${
                activeTab === 'practice'
                  ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400'
              }`}
            >
              Practice
            </button>
          </div>

          {/* Desktop: Side by Side Layout */}
          {(activeTab === 'side-by-side' || window.innerWidth >= 768) && (
            <div className="hidden md:grid grid-cols-2 gap-6 mb-8">
              {/* Left: Practice Notebook */}
              <div className="col-span-1">
                <div className="sticky top-4">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-3xl">💻</span>
                    Practice Here
                  </h2>
                  <div className="bg-white dark:bg-slate-800 rounded-lg border-2 border-indigo-300 dark:border-indigo-700 overflow-hidden shadow-lg">
                    <PracticeNotebook projectId={project.id} />
                  </div>
                </div>
              </div>

              {/* Right: Solved Project */}
              <div className="col-span-1">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-3xl">📚</span>
                  Solved Project with Notes
                </h2>
                <div className="space-y-4">
                  {project.solvedCells.map((cell, index) => (
                    <NotebookCell
                      key={cell.id}
                      cell={cell}
                      explanation={cell.explanation}
                      cellNumber={index + 1}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Mobile: Stacked Layout */}
          <div className="md:hidden">
            {(activeTab === 'solved' || activeTab === 'side-by-side') && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-3xl">📚</span>
                  Solved Project with Notes
                </h2>
                <div className="space-y-4">
                  {project.solvedCells.map((cell, index) => (
                    <NotebookCell
                      key={cell.id}
                      cell={cell}
                      explanation={cell.explanation}
                      cellNumber={index + 1}
                    />
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'practice' || activeTab === 'side-by-side') && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-3xl">💻</span>
                  Practice Here
                </h2>
                <div className="bg-white dark:bg-slate-800 rounded-lg border-2 border-indigo-300 dark:border-indigo-700 overflow-hidden shadow-lg">
                  <PracticeNotebook projectId={project.id} />
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-12 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6 border border-indigo-200 dark:border-indigo-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
              💡 Tips for Learning
            </h3>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300">
              <li>✓ First, carefully read through the solved project to understand the approach</li>
              <li>✓ Pay attention to the &quot;why&quot; behind each decision and what alternatives were considered</li>
              <li>✓ Then, switch to the practice section and try to replicate the steps yourself</li>
              <li>✓ Don&apos;t copy-paste; type the code to build muscle memory</li>
              <li>✓ Experiment with the code - change parameters and see what happens</li>
              <li>✓ Take notes of your learnings and insights</li>
            </ul>
          </div>
        </div>
      </div>
    </Container>
  );
}
