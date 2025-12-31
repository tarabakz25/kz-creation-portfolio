import React, { useRef } from "react";
import gsap from "gsap";
import { useGridAnimation } from "~/hooks";

interface ScreenMigrationProps {
  onFadeInComplete?: () => void;
  onFadeOutComplete?: () => void;
  skipFadeIn?: boolean;
}

/**
 * ページ遷移エフェクトコンポーネント
 * グリッドアニメーションでページ遷移を視覚的に表現
 */
const ScreenMigration: React.FC<ScreenMigrationProps> = ({
  onFadeInComplete,
  onFadeOutComplete,
  skipFadeIn = false,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // グリッドアニメーションフックを使用
  const { cols, rows, cellSize } = useGridAnimation({
    skipFadeIn,
    onFadeInComplete,
    onFadeOutComplete: () => {
      // グリッドフェードアウト完了後、コンテンツ全体をフェードアウト
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
          onComplete: () => {
            // sessionStorageをクリア
            sessionStorage.removeItem("showMigration");
            onFadeOutComplete?.();
          },
        });
      } else {
        sessionStorage.removeItem("showMigration");
        onFadeOutComplete?.();
      }
    },
  });

  if (cols === 0 || rows === 0) {
    return (
      <div
        className="fixed inset-0 w-full h-screen overflow-hidden z-50 pointer-events-none"
        ref={contentRef}
        style={{ backgroundColor: "transparent" }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 w-full h-screen overflow-hidden z-50 pointer-events-none"
      ref={contentRef}
      style={{ backgroundColor: "transparent" }}
    >
      <div
        className="absolute inset-0 z-10"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          gap: "0",
          padding: "0",
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => (
          <div
            key={index}
            data-grid-cell-id={index}
            className="main-fg-bg"
            style={{
              opacity: skipFadeIn ? 1 : 0,
              willChange: "opacity",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ScreenMigration;
