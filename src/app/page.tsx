import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#58CC02]/10 to-white px-4">
      <main className="flex max-w-md flex-col items-center text-center">
        <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-[#58CC02] text-5xl shadow-lg shadow-[#58CC02]/30">
          💻
        </div>
        <h1 className="mb-2 text-4xl font-extrabold text-gray-900">CodeQuest</h1>
        <p className="mb-12 text-lg text-gray-600">
          Learn programming through interactive lessons, quizzes, and puzzles.
        </p>
        <div className="flex w-full max-w-xs flex-col gap-4">
          <Link
            href="/map"
            className="rounded-full bg-[#58CC02] px-8 py-4 font-bold text-white shadow-lg shadow-[#58CC02]/30 transition hover:bg-[#46A302] hover:scale-[1.02]"
          >
            Start Learning
          </Link>
          <Link
            href="/map"
            className="rounded-full border-2 border-gray-300 px-8 py-4 font-bold text-gray-700 transition hover:bg-gray-50"
          >
            Continue
          </Link>
        </div>
      </main>
    </div>
  );
}
