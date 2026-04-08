"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ProgressBar } from "@/components/ProgressBar";
import { SimulatorFooter } from "@/components/SimulatorFooter";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { SimulatorHero } from "@/components/SimulatorHero";
import { HSP_QUIZ_COUNT, HSP_QUIZ_ITEMS } from "@/data/hsp-quiz";
import { useSimulatorStore } from "@/store/simulator-store";

type QuizScreenProps = {
  questionNum: number;
};

export function QuizScreen({ questionNum }: QuizScreenProps) {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const success = useSimulatorStore((s) => s.success);
  const hspQuizAnswers = useSimulatorStore((s) => s.hspQuizAnswers);
  const hspQuizCompleted = useSimulatorStore((s) => s.hspQuizCompleted);
  const setHspAnswer = useSimulatorStore((s) => s.setHspAnswer);
  const finalizeHspQuiz = useSimulatorStore((s) => s.finalizeHspQuiz);
  const resetProgress = useSimulatorStore((s) => s.resetProgress);

  const index = questionNum - 1;
  const prompt = HSP_QUIZ_ITEMS[index];

  useEffect(() => {
    const unsub = useSimulatorStore.persist.onFinishHydration(() => {
      setReady(true);
    });
    if (useSimulatorStore.persist.hasHydrated()) {
      setReady(true);
    }
    return unsub;
  }, []);

  useEffect(() => {
    if (!ready) return;

    const firstUnanswered = hspQuizAnswers.findIndex((a) => a === null);
    if (firstUnanswered === -1) {
      if (hspQuizCompleted) {
        router.replace("/quiz/results");
      } else {
        finalizeHspQuiz();
        router.replace("/quiz/results");
      }
      return;
    }
    if (index > firstUnanswered) {
      router.replace(`/quiz/${firstUnanswered + 1}`);
    }
  }, [
    ready,
    hspQuizAnswers,
    hspQuizCompleted,
    index,
    router,
    finalizeHspQuiz,
  ]);

  const submitAnswer = useCallback(
    (value: boolean) => {
      setHspAnswer(index, value);
      if (index >= HSP_QUIZ_COUNT - 1) {
        finalizeHspQuiz();
        router.push("/quiz/results");
      } else {
        router.push(`/quiz/${index + 2}`);
      }
    },
    [index, setHspAnswer, finalizeHspQuiz, router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (aboutOpen) return;
      if (e.key === "1") {
        e.preventDefault();
        submitAnswer(true);
      }
      if (e.key === "2") {
        e.preventDefault();
        submitAnswer(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aboutOpen, submitAnswer]);

  const handleReset = () => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Reset all progress and scores to default?")
    ) {
      resetProgress();
      router.push("/");
    }
  };

  if (!ready || !prompt) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black font-mono text-[#00ff00]">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black font-mono text-[#e0e0e0]">
      <SimulatorHeader onAbout={() => setAboutOpen(true)} />

      <SimulatorHero
        stats={
          <>
            <ProgressBar label="Energy" value={0} smoothWidth={false} />
            <ProgressBar label="Success" value={success} />
          </>
        }
      />

      <p className="px-3 pb-2 text-center text-[10px] text-[#666] sm:px-4">
        Question {questionNum} / {HSP_QUIZ_COUNT}
      </p>

      <div className="mx-3 mb-4 flex-1 border-0 bg-[#00ff00e6] px-4 py-4 text-sm leading-relaxed text-black sm:mx-4 sm:text-base">
        <p className="whitespace-pre-wrap">{prompt}</p>
      </div>

      <div className="mx-3 mb-4 flex flex-col gap-2 sm:mx-4">
        <button
          type="button"
          onClick={() => submitAnswer(true)}
          className="border-2 border-[#ff00ff] bg-black px-3 py-3 text-left text-[10px] leading-snug text-white transition-opacity hover:bg-[#1a0a1a] sm:text-xs"
        >
          <span className="text-[#ffff00]">[1]</span> True
        </button>
        <button
          type="button"
          onClick={() => submitAnswer(false)}
          className="border-2 border-[#ff00ff] bg-black px-3 py-3 text-left text-[10px] leading-snug text-white transition-opacity hover:bg-[#1a0a1a] sm:text-xs"
        >
          <span className="text-[#ffff00]">[2]</span> False
        </button>
      </div>

      <SimulatorFooter onReset={handleReset} />

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
