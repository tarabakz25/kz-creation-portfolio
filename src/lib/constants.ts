/**
 * アプリケーション全体で使用される定数
 */

// ========================================
// Grid Animation Constants
// ========================================

/**
 * グリッドアニメーション関連の定数
 */
export const GRID_CONSTANTS = {
  /** セルのサイズ（px） */
  CELL_SIZE: 40,
  /** グリッドサイズ */
  GRID_SIZE: 24,
} as const;

// ========================================
// Animation Timing Constants
// ========================================

/**
 * アニメーションのタイミング定数（ミリ秒）
 */
export const ANIMATION_TIMINGS = {
  /** 通常のフェード時間 */
  FADE_DURATION: 0.6,
  /** 短いフェード時間 */
  FADE_SHORT: 0.3,
  /** 長いフェード時間 */
  FADE_LONG: 0.8,
  /** スタッガーの最大時間 */
  STAGGER_MAX: 0.8,
  /** マイグレーション遅延 */
  MIGRATION_DELAY: 500,
  /** ローディング遅延 */
  LOADING_DELAY: 1000,
} as const;

// ========================================
// Animation Easing Presets
// ========================================

/**
 * アニメーションイージングプリセット
 */
export const ANIMATION_EASING = {
  POWER2_IN: 'power2.in',
  POWER2_OUT: 'power2.out',
  POWER3_OUT: 'power3.out',
} as const;

// ========================================
// Responsive Breakpoints
// ========================================

/**
 * レスポンシブブレークポイント（px）
 */
export const BREAKPOINTS = {
  /** モバイル境界 */
  MOBILE: 768,
  /** タブレット境界 */
  TABLET: 1024,
  /** デスクトップ境界 */
  DESKTOP: 1280,
} as const;
