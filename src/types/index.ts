/**
 * 共通型定義
 * プロジェクト全体で使用される型を一元管理
 */

// ========================================
// Navigation Types
// ========================================

/**
 * アプリケーション内のページタイプ
 */
export type Page = "home" | "profile" | "works";

// ========================================
// Grid Animation Types
// ========================================

/**
 * グリッドセル
 */
export interface GridCell {
  id: number;
  row: number;
  col: number;
  distance: number;
}

/**
 * グリッドアニメーション設定
 */
export interface GridAnimationConfig {
  cellSize?: number;
  skipFadeIn?: boolean;
  onFadeInComplete?: () => void;
  onFadeOutComplete?: () => void;
}

// ========================================
// Animation Callback Types
// ========================================

/**
 * アニメーションコールバック
 */
export type AnimationCallback = () => void;

/**
 * アニメーション完了コールバック
 */
export type AnimationCompleteCallback = () => void;
