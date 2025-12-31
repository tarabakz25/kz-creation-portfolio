import { useEffect } from 'react';

/**
 * ページ全体のスクロールを完全に無効化するフック
 * SPA動作のためにスクロールを防止する
 */
export function useScrollPrevention() {
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

    // イベントリスナー登録
    window.addEventListener('wheel', preventScrollWheel, { passive: false });
    window.addEventListener('touchmove', preventScrollTouch, { passive: false });
    window.addEventListener('scroll', preventScroll, { passive: false });
    document.addEventListener('wheel', preventScrollWheel, { passive: false });
    document.addEventListener('touchmove', preventScrollTouch, { passive: false });
    document.addEventListener('scroll', preventScroll, { passive: false });

    // 元のスタイルを保存
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;
    const originalBodyPosition = document.body.style.position;
    const originalBodyWidth = document.body.style.width;
    const originalBodyHeight = document.body.style.height;

    // スタイル適用
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';

    return () => {
      // クリーンアップ: イベントリスナー削除
      window.removeEventListener('wheel', preventScrollWheel);
      window.removeEventListener('touchmove', preventScrollTouch);
      window.removeEventListener('scroll', preventScroll);
      document.removeEventListener('wheel', preventScrollWheel);
      document.removeEventListener('touchmove', preventScrollTouch);
      document.removeEventListener('scroll', preventScroll);

      // スタイルを元に戻す
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.body.style.position = originalBodyPosition;
      document.body.style.width = originalBodyWidth;
      document.body.style.height = originalBodyHeight;
    };
  }, []);
}
