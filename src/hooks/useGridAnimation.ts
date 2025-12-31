import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { GRID_CONSTANTS, ANIMATION_TIMINGS, ANIMATION_EASING } from '~/lib/constants';
import { createGridCells, shuffleArray } from '~/lib/utils';
import type { GridAnimationConfig } from '~/types';

/**
 * グリッドアニメーションフック
 * Loading と ScreenMigration で共通のグリッドアニメーションロジックを提供
 *
 * @param config - アニメーション設定
 * @returns グリッド情報とアニメーション状態
 */
export function useGridAnimation(config: GridAnimationConfig) {
  const {
    cellSize = GRID_CONSTANTS.CELL_SIZE,
    skipFadeIn = false,
    onFadeInComplete,
    onFadeOutComplete,
  } = config;

  const [cols, setCols] = useState(0);
  const [rows, setRows] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const onFadeInCompleteRef = useRef(onFadeInComplete);
  const onFadeOutCompleteRef = useRef(onFadeOutComplete);

  // コールバック更新（依存配列の問題を回避）
  useEffect(() => {
    onFadeInCompleteRef.current = onFadeInComplete;
    onFadeOutCompleteRef.current = onFadeOutComplete;
  }, [onFadeInComplete, onFadeOutComplete]);

  // グリッドサイズ計算
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const calculatedCols = Math.ceil(window.innerWidth / cellSize);
    const calculatedRows = Math.ceil(window.innerHeight / cellSize);
    setCols(calculatedCols);
    setRows(calculatedRows);
  }, [cellSize]);

  // アニメーション実行
  useEffect(() => {
    if (typeof window === 'undefined' || cols === 0 || rows === 0) return;

    const cells = createGridCells(cols, rows);
    const shuffledCells = shuffleArray(cells);

    let fadeInTimeline: gsap.core.Timeline | null = null;
    let fadeOutTimeline: gsap.core.Timeline | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const startFadeIn = () => {
      if (skipFadeIn) {
        // フェードインをスキップして即座に表示
        shuffledCells.forEach((cell) => {
          const element = document.querySelector(`[data-grid-cell-id="${cell.id}"]`);
          if (element) {
            gsap.set(element, { opacity: 1 });
          }
        });
        setIsAnimating(false);
        onFadeInCompleteRef.current?.();

        timeoutId = setTimeout(() => {
          startFadeOut();
        }, ANIMATION_TIMINGS.MIGRATION_DELAY);
      } else {
        // フェードインアニメーション
        fadeInTimeline = gsap.timeline();

        shuffledCells.forEach((cell) => {
          const element = document.querySelector(`[data-grid-cell-id="${cell.id}"]`);
          if (element) {
            const staggerDelay = Math.random() * ANIMATION_TIMINGS.STAGGER_MAX;
            fadeInTimeline!.fromTo(
              element,
              { opacity: 0 },
              {
                opacity: 1,
                duration: ANIMATION_TIMINGS.FADE_SHORT,
                ease: ANIMATION_EASING.POWER2_OUT,
              },
              staggerDelay
            );
          }
        });

        fadeInTimeline.eventCallback('onComplete', () => {
          setIsAnimating(false);
          onFadeInCompleteRef.current?.();

          timeoutId = setTimeout(() => {
            startFadeOut();
          }, ANIMATION_TIMINGS.MIGRATION_DELAY);
        });
      }
    };

    const startFadeOut = () => {
      fadeOutTimeline = gsap.timeline();
      const reshuffled = shuffleArray([...cells]);

      reshuffled.forEach((cell) => {
        const element = document.querySelector(`[data-grid-cell-id="${cell.id}"]`);
        if (element) {
          const staggerDelay = Math.random() * ANIMATION_TIMINGS.STAGGER_MAX;
          fadeOutTimeline!.to(
            element,
            {
              opacity: 0,
              duration: ANIMATION_TIMINGS.FADE_SHORT,
              ease: ANIMATION_EASING.POWER2_IN,
            },
            staggerDelay
          );
        }
      });

      fadeOutTimeline.eventCallback('onComplete', () => {
        onFadeOutCompleteRef.current?.();
      });
    };

    // アニメーション開始（2フレーム待機してDOMのレンダリングを確実に）
    const rafId = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        startFadeIn();
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutId) clearTimeout(timeoutId);
      if (fadeInTimeline) fadeInTimeline.kill();
      if (fadeOutTimeline) fadeOutTimeline.kill();
    };
  }, [cols, rows, cellSize, skipFadeIn]);

  return { cols, rows, isAnimating, cellSize };
}
