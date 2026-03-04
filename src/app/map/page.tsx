"use client";

import Link from "next/link";
import { useProgressStore } from "@/store/useProgressStore";
import { LevelCard } from "@/components/LevelCard";
import { levels } from "@/data/levels";

export default function MapPage() {
  const { xp, isLevelUnlocked, isLevelCompleted } = useProgressStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#58CC02]/10 to-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
        <Link href="/" className="text-xl font-bold text-gray-900">
          CodeQuest
        </Link>
        <div className="flex items-center gap-2 rounded-full bg-[#FFC800] px-4 py-2">
          <span className="text-lg">⚡</span>
          <span className="font-bold text-gray-900">{xp} XP</span>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
          Choose a Level
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {levels.map((level) => (
            <LevelCard
              key={level.id}
              id={level.id}
              topic={level.topic}
              isUnlocked={isLevelUnlocked(level.id)}
              isCompleted={isLevelCompleted(level.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
