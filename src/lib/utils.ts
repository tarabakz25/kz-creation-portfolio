import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { GridCell } from "~/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 日付を指定されたロケールでフォーマット
 * @param dateString - ISO 8601形式の日付文字列
 * @param locale - ロケール（デフォルト: 'ja-JP'）
 * @returns フォーマットされた日付文字列
 */
export function formatDate(dateString: string, locale = "ja-JP"): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

/**
 * 配列をランダムにシャッフル（Fisher-Yatesアルゴリズム）
 * @param array - シャッフルする配列
 * @returns シャッフルされた新しい配列
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * グリッドセルの配列を生成
 * @param cols - 列数
 * @param rows - 行数
 * @returns グリッドセルの配列
 */
export function createGridCells(cols: number, rows: number): GridCell[] {
  const centerX = Math.floor(cols / 2);
  const centerY = Math.floor(rows / 2);
  const cells: GridCell[] = [];

  let id = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const distance = Math.hypot(col - centerX, row - centerY);
      cells.push({ id: id++, row, col, distance });
    }
  }

  return cells;
}
