"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ProgressBar } from "@/components/ProgressBar";
import { SimulatorFooter } from "@/components/SimulatorFooter";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { SimulatorHero } from "@/components/SimulatorHero";
import { LANDING_NARRATIVE } from "@/content/landing-narrative";
import { FIRST_QUESTION_ID } from "@/data/question-bank";
import { useSimulatorStore } from "@/store/simulator-store";

const BAR_MS = 1200;
const MS_PER_CHAR = 12;

export function SimulatorLanding() {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);
  const energyFromStore = useSimulatorStore((s) => s.energy);
  const hspQuizCompleted = useSimulatorStore((s) => s.hspQuizCompleted);
  const targetSuccess = useSimulatorStore((s) => s.success);
  const resetProgress = useSimulatorStore((s) => s.resetProgress);

  const targetEnergy = hspQuizCompleted ? energyFromStore : 0;

  const [displayEnergy, setDisplayEnergy] = useState(0);
  const [displaySuccess, setDisplaySuccess] = useState(0);
  const [barsDone, setBarsDone] = useState(false);
  const [visibleChars, setVisibleChars] = useState(0);
  const [typewriterDone, setTypewriterDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const start = performance.now();
    const te = targetEnergy;
    const ts = targetSuccess;

    function frame(now: number) {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / BAR_MS);
      const ease = 1 - (1 - t) ** 3;
      setDisplayEnergy(Math.round(te * ease));
      setDisplaySuccess(Math.round(ts * ease));
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        setBarsDone(true);
      }
    }
    requestAnimationFrame(frame);
    return () => {
      cancelled = true;
    };
  }, [targetEnergy, targetSuccess]);

  useEffect(() => {
    const text = LANDING_NARRATIVE;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setVisibleChars(i);
      if (i >= text.length) {
        window.clearInterval(id);
        setTypewriterDone(true);
      }
    }, MS_PER_CHAR);
    return () => window.clearInterval(id);
  }, []);

  const canStart = barsDone && typewriterDone;

  const goToNext = useCallback(() => {
    if (!canStart) return;
    if (hspQuizCompleted) {
      router.push(`/scenario/${FIRST_QUESTION_ID}`);
    } else {
      router.push("/quiz/intro");
    }
  }, [canStart, hspQuizCompleted, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (aboutOpen) return;
      if (e.key === "y" || e.key === "Y") {
        e.preventDefault();
        if (canStart) goToNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aboutOpen, canStart, goToNext]);

  const revealedText = LANDING_NARRATIVE.slice(0, visibleChars);

  const handleReset = () => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Reset all progress and scores to default?")
    ) {
      resetProgress();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black font-mono text-[#e0e0e0]">
      <SimulatorHeader onAbout={() => setAboutOpen(true)} />

      <SimulatorHero
        stats={
          <>
            <ProgressBar
              label="Energy"
              value={displayEnergy}
              smoothWidth={false}
            />
            <ProgressBar
              label="Success"
              value={displaySuccess}
              smoothWidth={false}
            />
          </>
        }
      />

      <div className="mx-3 mb-2 flex-1 border-0 bg-[#00ff00e6] px-4 py-4 text-sm leading-relaxed text-black sm:mx-4 sm:text-base">
        <p className="whitespace-pre-wrap">{revealedText}</p>
      </div>

      <div className="mx-3 mb-4 sm:mx-4">
        <button
          type="button"
          onClick={goToNext}
          disabled={!canStart}
          className="w-full border-2 border-[#00ff00] bg-black px-4 py-3 text-center text-[10px] uppercase tracking-wide text-[#00ff00] transition-opacity enabled:hover:bg-[#0a1a0a] disabled:cursor-not-allowed disabled:opacity-40 sm:text-xs"
        >
          Press y to begin
        </button>
      </div>

      <SimulatorFooter onReset={handleReset} />

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
