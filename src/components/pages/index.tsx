import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Loading from '../layouts/Loading';
import ScreenMigration from '../layouts/ScreenMigration';
import Profile from './Profile';
import Activity from './Activity';
import Blog from './Blog';

type Page = 'home' | 'profile' | 'activity' | 'blog';

export default function IndexContent() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMigrating, setIsMigrating] = useState(false);
  const [nextPage, setNextPage] = useState<Page | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && contentRef.current) {
      // コンテンツをフェードイン
      gsap.fromTo(contentRef.current, 
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }
  }, [isLoading]);

  // ページ変更時のフェードイン
  useEffect(() => {
    if (!isLoading && pageContentRef.current && currentPage !== 'home') {
      gsap.fromTo(pageContentRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out"
        }
      );
    }
  }, [currentPage, isLoading]);

  const handlePageChange = (page: Page) => {
    if (currentPage === page) return;
    
    setNextPage(page);
    setIsMigrating(true);
  };

  const handleFadeInComplete = () => {
    // フェードイン完了後、ページを切り替え
    if (nextPage) {
      setCurrentPage(nextPage);
      // フェードアウトはScreenMigrationコンポーネント内で自動的に実行される
    }
  };

  const handleFadeOutComplete = () => {
    // フェードアウト完了後、マイグレーション状態をリセット
    setIsMigrating(false);
    setNextPage(null);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="w-full h-screen flex items-center p-12 text-[#fcfcfc] font-futura text-3xl">
            <h1>I'm a seeker who thrives in chaotic times!</h1>
          </div>
        );
      case 'profile':
        return <Profile />;
      case 'activity':
        return <Activity />;
      case 'blog':
        return <Blog />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#252525]">
      {isLoading ? (
        <Loading onComplete={() => setIsLoading(false)} />
      ) : (
        <div ref={contentRef} className="opacity-0 w-full min-h-screen flex flex-col">
          <Header onPageChange={handlePageChange} currentPage={currentPage} />
          <div ref={pageContentRef} className="flex-1">
            {renderPageContent()}
          </div>
          <Footer />
        </div>
      )}
      {isMigrating && (
        <ScreenMigration 
          onFadeInComplete={handleFadeInComplete}
          onFadeOutComplete={handleFadeOutComplete}
        />
      )}
    </div>
  )
}
