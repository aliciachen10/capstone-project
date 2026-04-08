"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ProgressBar } from "@/components/ProgressBar";
import { SimulatorFooter } from "@/components/SimulatorFooter";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { SimulatorHero } from "@/components/SimulatorHero";
import { FIRST_QUESTION_ID } from "@/data/question-bank";
import { useSimulatorStore } from "@/store/simulator-store";

const INTRO_COPY =
  "You will now take a quiz that assesses how you relate to and process sensory stimuli before you start the scenarios. Are you ready to begin?";

export function QuizIntroScreen() {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const success = useSimulatorStore((s) => s.success);
  const hspQuizCompleted = useSimulatorStore((s) => s.hspQuizCompleted);
  const resetProgress = useSimulatorStore((s) => s.resetProgress);

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
    if (hspQuizCompleted) {
      router.replace(`/scenario/${FIRST_QUESTION_ID}`);
    }
  }, [ready, hspQuizCompleted, router]);

  const handleReset = () => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Reset all progress and scores to default?")
    ) {
      resetProgress();
      router.push("/");
    }
  };

  const begin = () => {
    router.push("/quiz/1");
  };

  if (!ready) {
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

      <div className="mx-3 mb-4 flex-1 border-0 bg-[#00ff00e6] px-4 py-4 text-sm leading-relaxed text-black sm:mx-4 sm:text-base">
        <p className="whitespace-pre-wrap">{INTRO_COPY}</p>
      </div>

      <div className="mx-3 mb-4 sm:mx-4">
        <button
          type="button"
          onClick={begin}
          className="w-full border-2 border-[#00ff00] bg-black px-4 py-3 text-center text-[10px] uppercase tracking-wide text-[#00ff00] transition-opacity hover:bg-[#0a1a0a] sm:text-xs"
        >
          Begin
        </button>
      </div>

      <SimulatorFooter onReset={handleReset} />

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
