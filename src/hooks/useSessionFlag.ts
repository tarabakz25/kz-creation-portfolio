import { useState, useEffect } from 'react';

/**
 * sessionStorageのフラグを管理するフック
 *
 * @param key - sessionStorageのキー
 * @param clearOnUnload - ページアンロード時にフラグをクリアするか（デフォルト: true）
 * @returns フラグの状態と操作関数
 */
export function useSessionFlag(key: string, clearOnUnload = true) {
  const [flag, setFlag] = useState<boolean>(false);

  // 初期化: sessionStorageから読み込み
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const value = sessionStorage.getItem(key) === 'true';
    setFlag(value);
  }, [key]);

  // アンロード時にクリア
  useEffect(() => {
    if (!clearOnUnload || typeof window === 'undefined') return;

    const handleBeforeUnload = () => {
      sessionStorage.removeItem(key);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [key, clearOnUnload]);

  /**
   * sessionStorageにフラグを設定
   */
  const setSessionFlag = (value: boolean) => {
    setFlag(value);
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, String(value));
    }
  };

  /**
   * sessionStorageからフラグをクリア
   */
  const clearSessionFlag = () => {
    setFlag(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  };

  return { flag, setSessionFlag, clearSessionFlag };
}
