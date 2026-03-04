"use client";

import Link from "next/link";

interface RewardModalProps {
  xpEarned: number;
  levelTopic: string;
  nextLevelId: number | null;
}

export function RewardModal({ xpEarned, levelTopic, nextLevelId }: RewardModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        className="relative max-w-md animate-[rewardPop_0.5s_ease-out] rounded-3xl bg-white p-8 shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reward-title"
      >
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#FFC800]">
            <span className="text-5xl">🎉</span>
          </div>
        </div>
        <h2 id="reward-title" className="mb-2 text-center text-2xl font-bold text-gray-900">
          Level Complete!
        </h2>
        <p className="mb-6 text-center text-gray-600">You mastered {levelTopic}</p>
        <div className="mb-8 flex items-center justify-center gap-2 rounded-xl bg-green-100 py-4">
          <span className="text-2xl font-bold text-green-700">+{xpEarned} XP</span>
        </div>
        <div className="flex flex-col gap-3">
          {nextLevelId ? (
            <Link
              href={`/level/${nextLevelId}`}
              className="rounded-full bg-[#58CC02] px-8 py-3 text-center font-bold text-white transition hover:bg-[#46A302]"
            >
              Next Level
            </Link>
          ) : (
            <p className="text-center text-gray-500">You&apos;ve completed all levels!</p>
          )}
          <Link
            href="/map"
            className="rounded-full border-2 border-gray-200 px-8 py-3 text-center font-bold text-gray-700 transition hover:bg-gray-50"
          >
            Back to Map
          </Link>
        </div>
      </div>
    </div>
  );
}
