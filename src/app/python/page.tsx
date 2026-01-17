import { Metadata } from 'next';
import Link from 'next/link';
import { Container } from '@/components/Container';
import PythonNotesDisplay from '@/components/PythonNotesDisplay';

export const metadata: Metadata = {
  title: 'Python Learning Platform',
  description: 'Share your Python learning journey, upload code snippets, images, and videos. Collaborate with fellow students.',
};

export default function PythonPage() {
  return (
    <Container>
      <div className="py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            🐍 Python Learning Hub
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Share your practical learnings, code snippets, Google Colab tips, and discoveries with your peers. 
            Document your journey with text, images, and videos all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Projects Card */}
          <Link href="/python/projects" className="group">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 rounded-lg p-8 text-white shadow-lg hover:shadow-xl transition-all h-full">
              <div className="flex items-start justify-between mb-4">
                <span className="text-4xl">📚</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                  New
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Python Projects</h3>
              <p className="text-indigo-100 mb-4">
                Learn through real-world projects with detailed explanations and practice sections
              </p>
              <div className="inline-flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
                Explore Projects
                <span className="text-xl">→</span>
              </div>
            </div>
          </Link>

          {/* Info Card */}
          <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-8">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-3 text-lg">
              ✨ How It Works:
            </h3>
            <ul className="text-indigo-800 dark:text-indigo-200 space-y-2 text-sm">
              <li>✓ Share your learning notes and observations</li>
              <li>✓ Add Python code with explanations</li>
              <li>✓ Upload screenshots, images, and videos</li>
              <li>✓ Edit or update your notes anytime</li>
              <li>✓ All posts include date and time stamps</li>
              <li>✓ Latest posts appear at the top for easy discovery</li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
            Student Learning Notes
          </h2>
          <PythonNotesDisplay />
        </div>

        {/* Footer Info */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-center text-slate-600 dark:text-slate-400 text-sm">
            💡 Tip: Write clear explanations, include code comments, and add visual examples to help your classmates learn faster!
          </p>
        </div>
      </div>
    </Container>
  );
}
