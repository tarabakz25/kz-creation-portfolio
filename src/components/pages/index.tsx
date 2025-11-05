import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Loading from '../layouts/Loading';
import ScreenMigration from '../layouts/ScreenMigration';
import MotionBackground from '../layouts/MotionBackground';

import Home from './Home';
import Profile from './Profile';
import Activity from './Activity';
import Notes from './Notes';

type Page = 'home' | 'profile' | 'activity' | 'notes';

export default function IndexContent() {
  // SSRとクライアント側で一貫性を保つため、初期状態は常にtrue（ローディング表示）
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const [justFinishedLoading, setJustFinishedLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMigrating, setIsMigrating] = useState(false);
  const [nextPage, setNextPage] = useState<Page | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);

  // クライアント側でのみhasVisitedをチェック
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visited = sessionStorage.getItem('hasVisited') === 'true';
      setHasVisited(visited);
      setIsLoading(!visited);
    }
  }, []);

  // サイトを離れる時にフラグをクリア
  useEffect(() => {
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('hasVisited');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // スクロール動作を完全に無効化
  useEffect(() => {
    const preventScroll = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventScrollWheel = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    const preventScrollTouch = (e: TouchEvent) => {
      e.preventDefault();
      e.stopPropagation();
      return false;
    };

    // 各種スクロールイベントを防止
    window.addEventListener('wheel', preventScrollWheel, { passive: false });
    window.addEventListener('touchmove', preventScrollTouch, { passive: false });
    window.addEventListener('scroll', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScrollWheel, { passive: false });
    document.addEventListener('touchmove', preventScrollTouch, { passive: false });
    document.addEventListener('scroll', preventScroll, { passive: false });

    // bodyとhtmlのスクロールを無効化
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    return () => {
      window.removeEventListener('wheel', preventScrollWheel);
      window.removeEventListener('touchmove', preventScrollTouch);
      window.removeEventListener('scroll', preventScroll);
      document.removeEventListener('wheel', preventScrollWheel);
      document.removeEventListener('touchmove', preventScrollTouch);
      document.removeEventListener('scroll', preventScroll);
    };
  }, []);

  useEffect(() => {
    if (!isLoading && contentRef.current) {
      // コンテンツをフェードイン
      if (justFinishedLoading) {
        // ローディング完了直後の場合はフェードイン
        gsap.fromTo(contentRef.current, 
          { opacity: 0 },
          { 
            opacity: 1, 
            duration: 0.6,
            ease: "power2.out"
          }
        );
        setJustFinishedLoading(false);
      } else if (hasVisited) {
        // 既にアクセス済みの場合は即座に表示
        gsap.set(contentRef.current, { opacity: 1 });
      }
    }
  }, [isLoading, hasVisited, justFinishedLoading]);

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
        return <Home />;
      case 'profile':
        return <Profile />;
      case 'activity':
        return <Activity />;
      case 'notes':
        return <Notes />;
      default:
        return null;
    }
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setJustFinishedLoading(true);
    // ローディング完了後、アクセス済みフラグを設定
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('hasVisited', 'true');
    }
  };

  return (
    <>
      <MotionBackground client:load />
      <div className="w-full h-screen flex flex-col overflow-hidden">
        {isLoading ? (
          <Loading onComplete={handleLoadingComplete} />
        ) : (
          <div ref={contentRef} className={hasVisited ? "w-full h-screen flex flex-col overflow-hidden" : "opacity-0 w-full h-screen flex flex-col overflow-hidden"}>
            <Header onPageChange={handlePageChange} currentPage={currentPage} />
            <div ref={pageContentRef} className="flex-1 overflow-hidden">
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
    </>
  )
}
