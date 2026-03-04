"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { levels } from "@/data/levels";
import { useProgressStore } from "@/store/useProgressStore";
import { Quiz } from "@/components/Quiz";
import { BlockPuzzle } from "@/components/BlockPuzzle";
import { RewardModal } from "@/components/RewardModal";

type Section = "learn" | "quiz" | "puzzle";

export default function LevelPage() {
  const params = useParams();
  const router = useRouter();
  const levelId = Number(params.id);
  const level = levels.find((l) => l.id === levelId);

  const { completeLevel, isLevelUnlocked } = useProgressStore();

  const [section, setSection] = useState<Section>("learn");
  const [quizPassed, setQuizPassed] = useState(false);
  const [puzzlePassed, setPuzzlePassed] = useState(false);
  const [showReward, setShowReward] = useState(false);

  if (!level) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-600">Level not found</p>
        <Link href="/map" className="text-[#58CC02] font-bold hover:underline">
          Back to Map
        </Link>
      </div>
    );
  }

  const isUnlocked = isLevelUnlocked(levelId);
  if (!isUnlocked) {
    router.push("/map");
    return null;
  }

  const sections: { id: Section; label: string }[] = [
    { id: "learn", label: "Learn" },
    { id: "quiz", label: "Quiz" },
    { id: "puzzle", label: "Puzzle" },
  ];

  const handleQuizCorrect = () => setQuizPassed(true);
  const handleQuizWrong = () => {};
  const handlePuzzleCorrect = () => {
    setPuzzlePassed(true);
    completeLevel(level.id, level.xpReward);
    setShowReward(true);
  };
  const handlePuzzleWrong = () => {};

  const nextLevel = levels.find((l) => l.id === levelId + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#58CC02]/10 to-white">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-6">
        <Link href="/map" className="font-bold text-gray-900 hover:text-[#58CC02]">
          ← Back
        </Link>
        <h1 className="text-lg font-bold text-gray-900">{level.topic}</h1>
        <div className="w-16" />
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-8 flex gap-2">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setSection(s.id)}
              className={`
                flex-1 rounded-xl px-4 py-3 font-bold transition
                ${
                  section === s.id
                    ? "bg-[#58CC02] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          {section === "learn" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-900">Learn</h2>
              <p className="text-lg leading-relaxed text-gray-700">{level.learn}</p>
            </div>
          )}

          {section === "quiz" && (
            <Quiz
              question={level.quiz.question}
              options={level.quiz.options}
              correctAnswer={level.quiz.answer}
              onCorrect={handleQuizCorrect}
              onWrong={handleQuizWrong}
            />
          )}

          {section === "puzzle" && (
            <BlockPuzzle
              blocks={level.puzzle.blocks}
              correctOrder={level.puzzle.correctOrder}
              onCorrect={handlePuzzleCorrect}
              onWrong={handlePuzzleWrong}
            />
          )}
        </div>
      </main>

      {showReward && (
        <RewardModal
          xpEarned={level.xpReward}
          levelTopic={level.topic}
          nextLevelId={nextLevel?.id ?? null}
        />
      )}
    </div>
  );
}
