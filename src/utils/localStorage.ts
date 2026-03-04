import { STORAGE_KEY } from "./constants";

export interface StoredProgress {
  xp: number;
  completedLevels: number[];
  currentLevel: number;
}

export function loadProgress(): StoredProgress | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? (JSON.parse(data) as StoredProgress) : null;
  } catch {
    return null;
  }
}

export function saveProgress(progress: StoredProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Ignore storage errors
  }
}
