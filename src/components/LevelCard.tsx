"use client";

import Link from "next/link";
import { useProgressStore } from "@/store/useProgressStore";

interface LevelCardProps {
  id: number;
  topic: string;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export function LevelCard({ id, topic, isUnlocked, isCompleted }: LevelCardProps) {
  const content = (
    <div
      className={`
        flex h-20 w-20 flex-shrink-0 flex-col items-center justify-center rounded-full
        text-center font-semibold transition-all duration-200
        sm:h-24 sm:w-24
        ${
          isUnlocked
            ? isCompleted
              ? "bg-green-500 text-white shadow-lg shadow-green-500/30 hover:scale-105 hover:bg-green-600"
              : "bg-[#58CC02] text-white shadow-lg shadow-[#58CC02]/30 hover:scale-105 hover:bg-[#46A302]"
            : "cursor-not-allowed bg-gray-300 text-gray-500"
        }
      `}
    >
      {isCompleted ? (
        <span className="text-2xl sm:text-3xl">✓</span>
      ) : (
        <span className="text-lg sm:text-xl">{id}</span>
      )}
      <span className="mt-1 truncate px-1 text-xs sm:text-sm">{topic}</span>
    </div>
  );

  if (isUnlocked) {
    return (
      <Link href={`/level/${id}`} className="focus:outline-none focus:ring-2 focus:ring-[#58CC02] focus:ring-offset-2 rounded-full">
        {content}
      </Link>
    );
  }

  return (
    <div className="relative" title="Complete previous levels to unlock">
      {content}
    </div>
  );
}
