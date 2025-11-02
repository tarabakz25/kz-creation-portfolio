import React from 'react';
import Footer from '../layouts/Footer';

interface Activity {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'github' | 'project' | 'event' | 'other';
}

const activities: Activity[] = [
  {
    id: '1',
    date: '2024-01-15',
    title: 'プロジェクト完了',
    description: '新しいWebアプリケーションをリリースしました。',
    type: 'project',
  },
  {
    id: '2',
    date: '2024-01-10',
    title: 'GitHub Contribution',
    description: 'オープンソースプロジェクトに貢献しました。',
    type: 'github',
  },
  {
    id: '3',
    date: '2024-01-05',
    title: '技術イベント参加',
    description: 'カンファレンスに参加しました。',
    type: 'event',
  },
];

export default function Activity() {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'github':
        return '💻';
      case 'project':
        return '🚀';
      case 'event':
        return '📅';
      default:
        return '📌';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center">アクティビティ</h1>
        
        <div className="space-y-8">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm text-gray-400">{activity.date}</span>
                    <span className="px-3 py-1 bg-gray-700 rounded-full text-sm capitalize">
                      {activity.type}
                    </span>
                  </div>
                  <h2 className="text-2xl font-semibold mb-2">{activity.title}</h2>
                  <p className="text-gray-300">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

