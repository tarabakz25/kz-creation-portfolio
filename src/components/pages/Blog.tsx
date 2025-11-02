import React, { useEffect, useState } from 'react';
import Footer from '../layouts/Footer';

interface BlogPost {
  id: string;
  title: string;
  url: string;
  platform: 'note' | 'qiita';
  publishedAt: string;
  description?: string;
}

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/blog-posts');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const getPlatformIcon = (platform: BlogPost['platform']) => {
    switch (platform) {
      case 'note':
        return '📝';
      case 'qiita':
        return '📚';
      default:
        return '📄';
    }
  };

  const getPlatformColor = (platform: BlogPost['platform']) => {
    switch (platform) {
      case 'note':
        return 'bg-green-600 hover:bg-green-700';
      case 'qiita':
        return 'bg-blue-600 hover:bg-blue-700';
      default:
        return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white p-8 pt-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center">ブログ</h1>
        
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            <p className="mt-4 text-gray-400">読み込み中...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-900/50 border border-red-700 rounded-lg p-4 mb-8">
            <p className="text-red-200">エラー: {error}</p>
          </div>
        )}
        
        {!loading && !error && posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">記事が見つかりませんでした。</p>
          </div>
        )}
        
        {!loading && !error && posts.length > 0 && (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 text-3xl">
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm text-gray-400">{post.publishedAt}</span>
                      <span className={`px-3 py-1 rounded-full text-sm capitalize ${getPlatformColor(post.platform)}`}>
                        {post.platform}
                      </span>
                    </div>
                    <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                    {post.description && (
                      <p className="text-gray-300 mb-4">{post.description}</p>
                    )}
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-block px-4 py-2 rounded transition-colors ${getPlatformColor(post.platform)}`}
                    >
                      記事を読む →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

