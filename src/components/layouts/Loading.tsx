import React, { useRef } from "react";
import gsap from "gsap";
import { useGridAnimation } from "~/hooks";
import { ANIMATION_TIMINGS } from "~/lib/constants";
import titleTextImage from "~/assets/kz_creation.svg?url";

interface LoadingContentProps {
  onComplete?: () => void;
}

/**
 * ローディング画面コンポーネント
 * グリッドアニメーションで画面全体をカバーし、完了後にフェードアウト
 */
const Loading: React.FC<LoadingContentProps> = ({ onComplete }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // グリッドアニメーションフックを使用
  const { cols, rows, cellSize } = useGridAnimation({
    skipFadeIn: false,
    onFadeInComplete: undefined,
    onFadeOutComplete: () => {
      // グリッドフェードアウト完了後、コンテンツ全体をフェードアウト
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            onComplete?.();
          },
        });
      } else {
        onComplete?.();
      }
    },
  });

  if (cols === 0 || rows === 0) {
    return (
      <div
        className="relative w-full h-screen overflow-hidden main-bg"
        ref={contentRef}
      >
        <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
          <img src={titleTextImage} alt="Loading..." className="w-64 h-auto" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-screen overflow-hidden main-bg"
      ref={contentRef}
    >
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <img src={titleTextImage} alt="Loading..." className="w-64 h-auto" />
      </div>

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
              opacity: 1,
              willChange: "opacity",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loading;
