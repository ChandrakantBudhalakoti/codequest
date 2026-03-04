"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { STORAGE_KEY } from "@/utils/constants";

export interface ProgressState {
  xp: number;
  completedLevels: number[];
  currentLevel: number;
  addXP: (amount: number) => void;
  completeLevel: (levelId: number, xpReward: number) => void;
  isLevelUnlocked: (levelId: number) => boolean;
  isLevelCompleted: (levelId: number) => boolean;
  hydrate: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      completedLevels: [],
      currentLevel: 1,

      addXP: (amount) => set((state) => ({ xp: state.xp + amount })),

      completeLevel: (levelId, xpReward) =>
        set((state) => ({
          completedLevels: state.completedLevels.includes(levelId)
            ? state.completedLevels
            : [...state.completedLevels, levelId],
          xp: state.xp + xpReward,
          currentLevel: Math.max(state.currentLevel, levelId + 1),
        })),

      isLevelUnlocked: (levelId) => levelId <= get().currentLevel,

      isLevelCompleted: (levelId) => get().completedLevels.includes(levelId),

      hydrate: () => {},
    }),
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        xp: state.xp,
        completedLevels: state.completedLevels,
        currentLevel: state.currentLevel,
      }),
    }
  )
);
