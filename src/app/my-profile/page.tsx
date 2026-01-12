'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/Container';

export const dynamic = 'force-dynamic';

interface ProfileData {
  id: string;
  name: string;
  email: string;
  totalPoints: number;
  medal: string | null;
  totalLearnings: number;
  topicCounts: Record<string, number>;
  learnings: Array<{
    id: string;
    topic: string;
    title: string;
    createdAt: string;
  }>;
}

export default function MyProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
      return;
    }

    if (status === 'authenticated') {
      fetchProfile();
    }
  }, [status, router]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/auth/profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMedalEmoji = (medal: string | null) => {
    switch (medal) {
      case 'Platinum':
        return '🏆';
      case 'Gold':
        return '🥇';
      case 'Silver':
        return '🥈';
      default:
        return '⭐';
    }
  };

  const getMedalColor = (medal: string | null) => {
    switch (medal) {
      case 'Platinum':
        return 'from-slate-400 to-slate-600';
      case 'Gold':
        return 'from-yellow-400 to-yellow-600';
      case 'Silver':
        return 'from-gray-300 to-gray-500';
      default:
        return 'from-indigo-400 to-indigo-600';
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-slate-600 dark:text-slate-400">Loading your profile...</p>
        </div>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container>
        <div className="py-20 text-center">
          <p className="text-red-600 dark:text-red-400">Failed to load profile</p>
        </div>
      </Container>
    );
  }

  const topics = ['all', 'Python', 'SQL', 'Excel', 'Power BI', 'General Learning'];
  const filteredLearnings = selectedTopic === 'all' 
    ? profile.learnings 
    : profile.learnings.filter(l => l.topic === selectedTopic);

  return (
    <Container>
      <div className="py-20">
        {/* Header with Sign Out */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
              My Profile
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Welcome back, {profile.name}!
            </p>
          </div>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition"
          >
            Sign Out
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* Total Points */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Total Points
            </p>
            <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
              {profile.totalPoints}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Points earned
            </p>
          </div>

          {/* Medal */}
          <div className={`bg-gradient-to-br ${getMedalColor(profile.medal)} rounded-lg shadow-lg p-8 text-center text-white`}>
            <p className="text-sm font-medium mb-2 opacity-90">
              Your Medal
            </p>
            <p className="text-5xl font-bold mb-2">
              {getMedalEmoji(profile.medal)}
            </p>
            <p className="text-sm font-semibold">
              {profile.medal ? profile.medal + ' Medal' : 'Keep Learning!'}
            </p>
          </div>

          {/* Total Learnings */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Learnings Shared
            </p>
            <p className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
              {profile.totalLearnings}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500">
              Keep sharing!
            </p>
          </div>

          {/* Streak / Next Medal */}
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
              Next Milestone
            </p>
            {profile.totalPoints < 100 ? (
              <>
                <p className="text-4xl font-bold text-slate-600 dark:text-slate-300 mb-2">
                  {100 - profile.totalPoints}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Points to Silver
                </p>
              </>
            ) : profile.totalPoints < 500 ? (
              <>
                <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                  {500 - profile.totalPoints}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Points to Gold
                </p>
              </>
            ) : profile.totalPoints < 1000 ? (
              <>
                <p className="text-4xl font-bold text-slate-400 dark:text-slate-300 mb-2">
                  {1000 - profile.totalPoints}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  Points to Platinum
                </p>
              </>
            ) : (
              <>
                <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                  🌟
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  All Medals Unlocked!
                </p>
              </>
            )}
          </div>
        </div>

        {/* Medal Progress */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Medal Progress
          </h2>
          <div className="space-y-6">
            {/* Silver */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  🥈 Silver Medal
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {Math.min(profile.totalPoints, 100)} / 100
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                <div
                  className="bg-gray-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((profile.totalPoints / 100) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Gold */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  🥇 Gold Medal
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {Math.min(profile.totalPoints, 500)} / 500
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                <div
                  className="bg-yellow-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((profile.totalPoints / 500) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Platinum */}
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  🏆 Platinum Medal
                </span>
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {Math.min(profile.totalPoints, 1000)} / 1000
                </span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                <div
                  className="bg-slate-400 h-3 rounded-full transition-all"
                  style={{ width: `${Math.min((profile.totalPoints / 1000) * 100, 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Topic Stats */}
        {Object.keys(profile.topicCounts).length > 0 && (
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Learning by Topic
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {['Python', 'SQL', 'Excel', 'Power BI', 'General Learning'].map((topic) => (
                <div key={topic} className="bg-indigo-50 dark:bg-indigo-900/30 p-4 rounded-lg text-center">
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    {profile.topicCounts[topic] || 0}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {topic}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Your Learnings */}
        <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
            Your Learnings
          </h2>

          {/* Topic Filter */}
          <div className="mb-6 flex flex-wrap gap-2">
            {topics.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTopic(t)}
                className={`px-4 py-2 rounded-lg font-medium transition text-sm ${
                  selectedTopic === t
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                {t === 'all' ? 'All' : t}
              </button>
            ))}
          </div>

          {filteredLearnings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-600 dark:text-slate-400">
                No learnings in this topic yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLearnings.map((learning) => (
                <div
                  key={learning.id}
                  className="flex items-start justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {learning.title}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      <span className="inline-block bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded text-xs mr-2">
                        {learning.topic}
                      </span>
                      {new Date(learning.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
