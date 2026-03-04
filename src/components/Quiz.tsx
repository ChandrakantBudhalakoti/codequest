"use client";

import { useState } from "react";

interface QuizProps {
  question: string;
  options: string[];
  correctAnswer: number;
  onCorrect: () => void;
  onWrong: () => void;
}

export function Quiz({ question, options, correctAnswer, onCorrect, onWrong }: QuizProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSelect = (index: number) => {
    if (hasAnswered) return;
    setSelected(index);
    setHasAnswered(true);
    if (index === correctAnswer) {
      onCorrect();
    } else {
      onWrong();
    }
  };

  const getButtonClass = (index: number) => {
    if (!hasAnswered) {
      return "bg-white border-2 border-gray-200 hover:border-[#58CC02] hover:bg-green-50";
    }
    if (index === correctAnswer) {
      return "bg-green-100 border-2 border-green-500 text-green-800";
    }
    if (index === selected && index !== correctAnswer) {
      return "bg-red-100 border-2 border-red-500 text-red-800";
    }
    return "bg-gray-50 border-2 border-gray-200 text-gray-400";
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-gray-900">Quiz</h3>
      <p className="text-lg text-gray-700">{question}</p>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleSelect(index)}
            disabled={hasAnswered}
            className={`
              w-full rounded-2xl px-6 py-4 text-left font-medium
              transition-all duration-200
              ${getButtonClass(index)}
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
