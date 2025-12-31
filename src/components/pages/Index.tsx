import React, { useState, useEffect, useRef, Suspense, lazy } from "react";
import gsap from "gsap";
import Header from "../layouts/Header";
import Loading from "../layouts/Loading";
import ScreenMigration from "../layouts/ScreenMigration";
import MotionBackground from "../layouts/MotionBackground";
import Home from "./Home";
import Profile, { type ProfileData } from "./Profile";
import { useScrollPrevention, useSessionFlag } from "~/hooks";
import type { Page } from "~/types";

// 重いコンポーネントの遅延ロード
const Activity = lazy(() => import("./Activity"));
const Works = lazy(() => import("./Works"));

type IndexContentProps = {
  profileData: ProfileData;
};

/**
 * メインコンテンツコンポーネント
 * アプリケーション全体のオーケストレーション
 */
export default function IndexContent({ profileData }: IndexContentProps) {
  // スクロール防止
  useScrollPrevention();

  // セッション管理
  const { flag: hasVisited, setSessionFlag: setHasVisited } =
    useSessionFlag("hasVisited");

  // 状態管理
  const [isLoading, setIsLoading] = useState(true);
  const [justFinishedLoading, setJustFinishedLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [isMigrating, setIsMigrating] = useState(false);
  const [nextPage, setNextPage] = useState<Page | null>(null);

  const contentRef = useRef<HTMLDivElement>(null);
  const pageContentRef = useRef<HTMLDivElement>(null);

  // クライアント側でのみhasVisitedをチェック
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLoading(!hasVisited);
    }
  }, [hasVisited]);

  // コンテンツフェードイン
  useEffect(() => {
    if (!isLoading && contentRef.current) {
      if (justFinishedLoading) {
        // ローディング完了直後の場合はフェードイン
        gsap.fromTo(
          contentRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
          },
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
    if (!isLoading && pageContentRef.current && currentPage !== "home") {
      gsap.fromTo(
        pageContentRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
      );
    }
  }, [currentPage, isLoading]);

  /**
   * ページ変更ハンドラー
   */
  const handlePageChange = (page: Page) => {
    if (currentPage === page) return;

    setNextPage(page);
    setIsMigrating(true);
  };

  /**
   * マイグレーションフェードイン完了
   */
  const handleFadeInComplete = () => {
    if (nextPage) {
      setCurrentPage(nextPage);
    }
  };

  /**
   * マイグレーションフェードアウト完了
   */
  const handleFadeOutComplete = () => {
    setIsMigrating(false);
    setNextPage(null);
  };

  /**
   * ローディング完了ハンドラー
   */
  const handleLoadingComplete = () => {
    setIsLoading(false);
    setJustFinishedLoading(true);
    setHasVisited(true);
  };

  /**
   * ページコンテンツレンダリング
   */
  const renderPageContent = () => {
    const LoadingFallback = () => (
      <div className="flex items-center justify-center h-full">
        <div className="text-main-fg font-eurostile text-lg sm:text-xl">
          Loading...
        </div>
      </div>
    );

    switch (currentPage) {
      case "home":
        return <Home />;
      case "profile":
        return <Profile data={profileData} />;
      case "activity":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Activity />
          </Suspense>
        );
      case "works":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <Works />
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <MotionBackground client:load />
      <div className="w-full h-screen flex flex-col overflow-hidden">
        {isLoading ? (
          <Loading onComplete={handleLoadingComplete} />
        ) : (
          <div
            ref={contentRef}
            className={
              hasVisited
                ? "w-full h-screen flex flex-col overflow-hidden"
                : "opacity-0 w-full h-screen flex flex-col overflow-hidden"
            }
          >
            <Header onPageChange={handlePageChange} currentPage={currentPage} />
            <div ref={pageContentRef} className="flex-1 overflow-hidden">
              {renderPageContent()}
            </div>
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
  );
}
