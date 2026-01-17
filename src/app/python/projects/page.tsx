'use client';

import Link from 'next/link';
import { Container } from '@/components/Container';
import { projects } from '@/data/projects';

export default function PythonProjectsPage() {
  return (
    <Container>
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Python Projects
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Learn data analysis, statistics, and Python through real-world projects with guided solutions and practice problems
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/python/projects/${project.id}`}
                className="group"
              >
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all p-6 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 h-full">
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold">
                      {project.category}
                    </span>
                    <span className="inline-block px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold">
                      {project.difficulty}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Dataset Info */}
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                    <span>📊 Dataset:</span>
                    <span className="font-semibold">{project.datasetName}</span>
                  </div>

                  {/* CTA */}
                  <div className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-semibold group-hover:gap-3 transition-all">
                    Start Project
                    <span className="text-xl">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Info Section */}
          <div className="mt-16 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-8 border border-indigo-200 dark:border-indigo-800">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              How to Use These Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">📚</span>
                  Study Solved Projects
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  On the right side, view detailed explanations of how to approach the problem, why certain decisions were made, and what alternatives were considered.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">💻</span>
                  Practice Independently
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  On the left side, get a blank notebook to practice the same concepts. Run your own code and take notes.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Learn by Doing
                </h3>
                <p className="text-slate-700 dark:text-slate-300">
                  Switch between viewing the solution and practicing. Try to replicate what you learned, then check against the solution.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
