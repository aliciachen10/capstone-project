"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ProgressBar } from "@/components/ProgressBar";
import { SimulatorFooter } from "@/components/SimulatorFooter";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { SimulatorHero } from "@/components/SimulatorHero";
import {
  countHspTrueAnswers,
  HSP_QUIZ_COUNT,
  HSP_QUIZ_CUTOFF,
} from "@/data/hsp-quiz";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useSimulatorStore } from "@/store/simulator-store";

const BAR_MS = 1400;

export function QuizResultsScreen() {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [displayEnergy, setDisplayEnergy] = useState(0);
  const [displaySuccess, setDisplaySuccess] = useState(0);
  const [animationDone, setAnimationDone] = useState(false);

  const success = useSimulatorStore((s) => s.success);
  const energy = useSimulatorStore((s) => s.energy);
  const hspQuizAnswers = useSimulatorStore((s) => s.hspQuizAnswers);
  const hspQuizCompleted = useSimulatorStore((s) => s.hspQuizCompleted);
  const finalizeHspQuiz = useSimulatorStore((s) => s.finalizeHspQuiz);
  const resetProgress = useSimulatorStore((s) => s.resetProgress);

  const trueCount = countHspTrueAnswers(hspQuizAnswers);
  const aboveCutoff = trueCount >= HSP_QUIZ_CUTOFF;

  const narrativeBody = useMemo(() => {
    const p1 = `Your score on this questionnaire was ${trueCount} / ${HSP_QUIZ_COUNT}.`;
    const p2 = `The cutoff for sensory processing sensitivity is ${HSP_QUIZ_CUTOFF}. This quiz was developed by Elaine Aron (sensory processing sensitivity researcher) to give people an idea of where they might be in terms of their degree of sensory processing sensitivity (SPS). SPS is a temperamental or personality trait involving "an increased sensitivity of the central nervous system and a deeper cognitive processing of physical, social, and emotional stimuli".The trait is characterized by "a tendency to 'pause to check' in novel situations, greater sensitivity to subtle stimuli, and the engagement of deeper cognitive processing strategies for employing coping actions, all of which is driven by heightened emotional reactivity, both positive and negative".`;
    const p3 = `${
      aboveCutoff
        ? "Your score is at or above that cutoff, which is often associated with higher sensory processing sensitivity."
        : "Your score is below that cutoff on this measure."
    } Your starting energy is set from this score: for the purposes of this game, higher sensitivity (more “True” answers) lowers starting energy, reflecting how much capacity you may have left after processing your environment. Conversely, higher sensitivity increases your degree of empathy and attunement to others, and increases starting success.`;
    return `${p1}\n\n${p2}\n\n${p3}`;
  }, [trueCount, aboveCutoff]);

  const { displayed: typedNarrative, done: narrativeDone } = useTypewriter(
    ready && hspQuizCompleted ? narrativeBody : "",
  );

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

    const firstNull = hspQuizAnswers.findIndex((a) => a === null);
    if (firstNull !== -1) {
      router.replace(`/quiz/${firstNull + 1}`);
      return;
    }

    if (!hspQuizCompleted) {
      finalizeHspQuiz();
    }
  }, [ready, hspQuizAnswers, hspQuizCompleted, finalizeHspQuiz, router]);

  useEffect(() => {
    if (!ready || !hspQuizCompleted || !narrativeDone) return;

    const targetEnergy = energy;
    const targetSuccess = success;
    setDisplayEnergy(0);
    setDisplaySuccess(0);
    setAnimationDone(false);
    let cancelled = false;
    const start = performance.now();

    function frame(now: number) {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / BAR_MS);
      const ease = 1 - (1 - t) ** 3;
      setDisplayEnergy(Math.round(targetEnergy * ease));
      setDisplaySuccess(Math.round(targetSuccess * ease));
      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        setAnimationDone(true);
      }
    }
    requestAnimationFrame(frame);
    return () => {
      cancelled = true;
    };
  }, [ready, hspQuizCompleted, narrativeDone, energy, success]);

  const handleReset = () => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Reset all progress and scores to default?")
    ) {
      resetProgress();
      router.push("/");
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black font-mono text-[#00ff00]">
        Loading…
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-[#e0e0e0]">
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

      <div className="mx-3 mb-4 flex-1 border-0 bg-[#00ff00e6] px-4 py-4 font-panel text-sm leading-relaxed text-black sm:mx-4 sm:text-base">
        <p className="whitespace-pre-wrap">{typedNarrative}</p>
        {narrativeDone && !animationDone && (
          <p className="mt-3 font-panel text-[10px] text-[#333] sm:text-xs">
            Calibrating energy…
          </p>
        )}
      </div>

      <div className="mx-3 mb-4 sm:mx-4">
        <Link
          href="/quiz/self-care/intro"
          className={`font-panel block w-full border-2 border-[#00ff00] bg-black px-4 py-3 text-center text-[10px] uppercase tracking-wide text-[#00ff00] transition-opacity sm:text-xs ${
            animationDone
              ? "hover:bg-[#0a1a0a]"
              : "pointer-events-none opacity-40"
          }`}
          aria-disabled={!animationDone}
        >
          Continue
        </Link>
      </div>

      <SimulatorFooter onReset={handleReset} />

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
