import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ANIMATION_TIMINGS, ANIMATION_EASING } from '~/lib/constants';

/**
 * GSAPフェードアニメーションフック
 * 要素のフェードイン/フェードアウトを簡単に実装
 *
 * @param shouldAnimate - アニメーションを実行するか
 * @param fadeIn - フェードインの場合true、フェードアウトの場合false（デフォルト: true）
 * @param onComplete - アニメーション完了時のコールバック
 * @returns 要素への参照
 */
export function useGsapFade(
  shouldAnimate: boolean,
  fadeIn: boolean = true,
  onComplete?: () => void
) {
  const elementRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!shouldAnimate || !elementRef.current) return;

    if (fadeIn) {
      gsap.fromTo(
        elementRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: ANIMATION_TIMINGS.FADE_DURATION,
          ease: ANIMATION_EASING.POWER2_OUT,
          onComplete: () => onCompleteRef.current?.(),
        }
      );
    } else {
      gsap.to(elementRef.current, {
        opacity: 0,
        duration: ANIMATION_TIMINGS.FADE_DURATION,
        ease: ANIMATION_EASING.POWER2_OUT,
        onComplete: () => onCompleteRef.current?.(),
      });
    }
  }, [shouldAnimate, fadeIn]);

  return elementRef;
}
