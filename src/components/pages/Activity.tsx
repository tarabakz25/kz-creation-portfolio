"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { formatDate } from "~/lib/utils";

export interface NoteArticle {
  title: string;
  url: string;
  publishedAt?: string;
  imageUrl?: string;
}

/**
 * デバイス幅に応じたパラメータを取得
 */
const getDeviceParams = (width: number) => {
  if (width < 640) {
    // Mobile
    return {
      itemHeight: 140,
      minScale: 0.9,
      maxScale: 1,
      minOpacity: 0.5,
      maxOpacity: 1,
      touchSensitivity: 1.0,
    };
  } else if (width < 1024) {
    // Tablet
    return {
      itemHeight: 170,
      minScale: 0.85,
      maxScale: 1,
      minOpacity: 0.4,
      maxOpacity: 1,
      touchSensitivity: 1.1,
    };
  } else {
    // Desktop
    return {
      itemHeight: 200,
      minScale: 0.85,
      maxScale: 1,
      minOpacity: 0.4,
      maxOpacity: 1,
      touchSensitivity: 1.2,
    };
  }
};

export default function Activity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);
  const scrollPositionRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchStartScrollRef = useRef<number>(0);
  const [articles, setArticles] = useState<NoteArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deviceParams, setDeviceParams] = useState(() => {
    if (typeof window !== "undefined") {
      return getDeviceParams(window.innerWidth);
    }
    return getDeviceParams(1024); // デフォルト値
  });

  // Note記事を取得
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/articles.json");
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }
        const data = await response.json();
        setArticles(data.items || []);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setArticles([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // ウィンドウリサイズ時のデバイスパラメータ更新
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setDeviceParams(getDeviceParams(window.innerWidth));
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!containerRef.current || articles.length === 0) return;

    const container = containerRef.current;
    const renderedItems = itemsRef.current;
    const { itemHeight, minScale, minOpacity } = deviceParams;
    const baseOffset = container.clientHeight / 2 - itemHeight / 2;
    const maxScroll = Math.max(0, (renderedItems.length - 1) * itemHeight);

    // 初期位置の設定
    renderedItems.forEach((item, index) => {
      gsap.set(item, {
        y: index * itemHeight + baseOffset,
        scale: minScale,
        opacity: minOpacity,
      });
    });

    // アイテムの位置とスケールを更新する関数
    const updateItems = () => {
      const centerY = container.clientHeight / 2;
      const { minScale, maxScale, minOpacity, maxOpacity } = deviceParams;

      renderedItems.forEach((item, index) => {
        const itemY =
          index * itemHeight - scrollPositionRef.current + baseOffset;
        const distanceFromCenter = Math.abs(centerY - (itemY + itemHeight / 2));
        const maxDistance = container.clientHeight / 2;

        // 中央に近いほど大きく、遠いほど小さく
        const scaleRange = maxScale - minScale;
        const opacityRange = maxOpacity - minOpacity;
        const scale = Math.max(
          minScale,
          maxScale - (distanceFromCenter / maxDistance) * scaleRange,
        );
        const opacity = Math.max(
          minOpacity,
          maxOpacity - (distanceFromCenter / maxDistance) * opacityRange,
        );

        gsap.to(item, {
          y: itemY,
          scale,
          opacity,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    };

    // ホイールイベント
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      scrollPositionRef.current = Math.max(
        0,
        Math.min(maxScroll, scrollPositionRef.current + e.deltaY * 0.5),
      );
      updateItems();
    };

    // タッチイベント
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        touchStartYRef.current = e.touches[0].clientY;
        touchStartScrollRef.current = scrollPositionRef.current;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null || e.touches.length !== 1) return;

      e.preventDefault();
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;
      const { touchSensitivity } = deviceParams;

      scrollPositionRef.current = Math.max(
        0,
        Math.min(
          maxScroll,
          touchStartScrollRef.current + deltaY * touchSensitivity,
        ),
      );
      updateItems();
    };

    const handleTouchEnd = () => {
      touchStartYRef.current = null;
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });

    updateItems();

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [articles.length, deviceParams]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="main-fg font-eurostile text-lg sm:text-xl">
          Loading...
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="main-fg font-eurostile text-lg sm:text-xl">
          No articles found
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mx-auto max-w-2xl h-screen p-2 sm:p-4 md:p-6 overflow-hidden select-none relative"
    >
      <div className="relative h-full">
        {articles.map((article, index) => (
          <div
            key={`${article.url}-${index}`}
            ref={(el) => {
              if (el) itemsRef.current[index] = el;
            }}
            className="absolute left-0 right-0 will-change-transform transform-gpu"
          >
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 md:mb-8 p-3 sm:p-4 md:p-6 main-fg transform-gpu transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                minHeight: `${deviceParams.itemHeight - 20}px`,
                height: "auto",
              }}
            >
              {/* 左側：テキストコンテンツ */}
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm md:text-base mb-1 sm:mb-2 font-futura opacity-80">
                  {article.publishedAt
                    ? formatDate(article.publishedAt, "ja-JP")
                    : ""}
                </div>
                <div className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 sm:mb-3 font-eurostile leading-tight">
                  {article.title}
                </div>
                <div className="text-xs sm:text-sm font-futura opacity-60 mt-2">
                  Read more →
                </div>
              </div>

              {/* 右側：ジャケット画像 */}
              {article.imageUrl && (
                <div className="flex-shrink-0">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
              )}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
