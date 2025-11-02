import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface Cell {
  id: number;
  row: number;
  col: number;
  distance: number;
}

interface ScreenMigrationProps {
  onFadeInComplete?: () => void;
  onFadeOutComplete?: () => void;
  skipFadeIn?: boolean; // フェードインをスキップしてフェードアウトのみ実行
}

const ScreenMigration: React.FC<ScreenMigrationProps> = ({ onFadeInComplete, onFadeOutComplete, skipFadeIn = false }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  
  const CELL_SIZE = 40;

  // ウィンドウサイズを計算してcols/rowsを設定
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const calculatedCols = Math.ceil(window.innerWidth / CELL_SIZE);
    const calculatedRows = Math.ceil(window.innerHeight / CELL_SIZE);
    setCols(calculatedCols);
    setRows(calculatedRows);
  }, []);

  // グリッドアニメーションを開始（cols/rowsが設定された後）
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (cols === 0 || rows === 0) return;

    const centerX = Math.floor(cols / 2);
    const centerY = Math.floor(rows / 2);

    const cells: Cell[] = [];
    let id = 0;
    for (let row = 0; row < rows; row ++) {
      for (let col = 0; col < cols; col ++) {
        const distance = Math.hypot(col - centerX, row - centerY);
        cells.push({ id: id++, row, col, distance });
      }
    }

    // 完全ランダムにシャッフル
    for (let i = cells.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cells[i], cells[j]] = [cells[j], cells[i]];
    }

    let fadeInTimeline: gsap.core.Timeline | null = null;
    let fadeOutTimeline: gsap.core.Timeline | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    // DOM要素が確実にレンダリングされた後にアニメーションを開始
    const startAnimation = () => {
      if (skipFadeIn) {
        // フェードインをスキップして、セルを即座に表示
        cells.forEach((cell) => {
          const cellElement = document.querySelector(`[data-migration-cell-id="${cell.id}"]`);
          if (cellElement) {
            gsap.set(cellElement, { opacity: 1 });
          }
        });
        setIsAnimating(false);
        // フェードイン完了を即座に通知
        onFadeInComplete?.();
        // 0.5秒待ってからフェードアウト
        timeoutId = setTimeout(() => {
          startFadeOut();
        }, 500);
      } else {
        // フェードインアニメーション（セルをランダムに表示）
        fadeInTimeline = gsap.timeline();

        cells.forEach((cell) => {
          const cellElement = document.querySelector(`[data-migration-cell-id="${cell.id}"]`);
          if (cellElement) {
            // 完全ランダムな遅延時間（0〜0.8秒の範囲）
            const staggerDelay = Math.random() * 0.8;
            fadeInTimeline!.fromTo(cellElement, 
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
              }, 
              staggerDelay
            );
          }
        });

        fadeInTimeline.eventCallback("onComplete", () => {
          setIsAnimating(false);
          // フェードイン完了を通知
          onFadeInComplete?.();
          // フェードイン完了後、0.5秒待ってからフェードアウト
          timeoutId = setTimeout(() => {
            startFadeOut();
          }, 500);
        });
      }
    };

    const startFadeOut = () => {
          // フェードアウトアニメーション（セルをランダムに非表示）
          fadeOutTimeline = gsap.timeline();

          // 再度シャッフルしてランダムにフェードアウト
          const shuffledCells = [...cells];
          for (let i = shuffledCells.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledCells[i], shuffledCells[j]] = [shuffledCells[j], shuffledCells[i]];
          }

          shuffledCells.forEach((cell) => {
            const cellElement = document.querySelector(`[data-migration-cell-id="${cell.id}"]`);
            if (cellElement) {
              // 完全ランダムな遅延時間（0〜0.8秒の範囲）
              const staggerDelay = Math.random() * 0.8;
              fadeOutTimeline!.to(cellElement, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
              }, staggerDelay);
            }
          });

      fadeOutTimeline.eventCallback("onComplete", () => {
        // 全てのセルがフェードアウトした後、コンポーネント全体を非表示にしてページを操作可能に
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
              // フラグをクリア
              sessionStorage.removeItem('showMigration');
              // フェードアウト完了を通知
              onFadeOutComplete?.();
            }
          });
        } else {
          sessionStorage.removeItem('showMigration');
          onFadeOutComplete?.();
        }
      });
    };

    // レンダリング完了を待つ（2フレーム待機）
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        startAnimation();
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      if (fadeInTimeline) {
        fadeInTimeline.kill();
      }
      if (fadeOutTimeline) {
        fadeOutTimeline.kill();
      }
    };

  }, [cols, rows, onFadeInComplete, onFadeOutComplete, skipFadeIn]);

  if (cols === 0 || rows === 0) {
    return (
      <div className="fixed inset-0 w-full h-screen overflow-hidden z-50 pointer-events-none" ref={contentRef} style={{ backgroundColor: 'transparent' }}>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden z-50 pointer-events-none" ref={contentRef} style={{ backgroundColor: 'transparent' }}>
      <div
        ref={containerRef}
        className="absolute inset-0 z-10"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${rows}, ${CELL_SIZE}px)`,
          gap: "0",
          padding: "0",
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => (
          <div
            key={index}
            data-migration-cell-id={index}
            className="bg-[#fcfcfc]"
            style={{
              opacity: skipFadeIn ? 1 : 0,
              willChange: "opacity",
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default ScreenMigration;

