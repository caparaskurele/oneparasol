import { Metadata } from 'next';
import { Container } from '@/components/Container';
import LearningsDisplay from '@/components/LearningsDisplay';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Share Your Learning',
  description: 'Share your learning experiences in Python, SQL, Excel, and Power BI',
};

export default function ShareLearningPage() {
  return (
    <Container>
      <div className="py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            📚 Share Your Learning
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Share your knowledge, earn points, and help your peers learn faster. Every learning shared earns you 10 points!
          </p>
        </div>

        {/* Info Box */}
        <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6 mb-12">
          <h3 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-3">
            ⭐ How to Earn Points:
          </h3>
          <ul className="text-indigo-800 dark:text-indigo-200 space-y-2 text-sm">
            <li>✓ Share a learning: +10 points</li>
            <li>✓ Reach 100 points: Get 🥈 Silver Medal</li>
            <li>✓ Reach 500 points: Get 🥇 Gold Medal</li>
            <li>✓ Reach 1000 points: Get 🏆 Platinum Medal</li>
            <li>✓ View all your learnings on your My Profile page</li>
          </ul>
        </div>

        {/* Main Content */}
        <LearningsDisplay />
      </div>
    </Container>
  );
}
