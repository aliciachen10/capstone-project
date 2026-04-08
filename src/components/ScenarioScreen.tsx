"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ProgressBar } from "@/components/ProgressBar";
import { SimulatorFooter } from "@/components/SimulatorFooter";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { SimulatorHero } from "@/components/SimulatorHero";
import type { Question } from "@/data/question-bank";
import { getNextQuestionId } from "@/data/question-bank";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useSimulatorStore } from "@/store/simulator-store";

type ScenarioScreenProps = {
  question: Question;
};

export function ScenarioScreen({ question }: ScenarioScreenProps) {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);

  const energy = useSimulatorStore((s) => s.energy);
  const success = useSimulatorStore((s) => s.success);
  const adjustEnergy = useSimulatorStore((s) => s.adjustEnergy);
  const adjustSuccess = useSimulatorStore((s) => s.adjustSuccess);
  const hasAnswered = useSimulatorStore((s) =>
    s.hasAnsweredQuestion(question.id),
  );
  const markAnswered = useSimulatorStore((s) => s.markQuestionAnswered);
  const resetProgress = useSimulatorStore((s) => s.resetProgress);

  const { displayed: typedPrompt, done: promptDone } = useTypewriter(
    question.prompt,
  );

  const handleChoice = useCallback(
    (energyDelta: number, successDelta: number) => {
      if (hasAnswered || !promptDone) return;
      adjustEnergy(energyDelta);
      adjustSuccess(successDelta);
      markAnswered(question.id);
      const next = getNextQuestionId(question.id);
      if (next) {
        router.push(`/scenario/${next}`);
      } else {
        router.push("/scenario/complete");
      }
    },
    [
      hasAnswered,
      promptDone,
      adjustEnergy,
      adjustSuccess,
      markAnswered,
      question.id,
      router,
    ],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (aboutOpen || hasAnswered || !promptDone) return;
      const n = parseInt(e.key, 10);
      if (Number.isNaN(n) || n < 1 || n > question.choices.length) return;
      const choice = question.choices[n - 1];
      if (!choice) return;
      e.preventDefault();
      handleChoice(choice.energyDelta, choice.successDelta);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aboutOpen, hasAnswered, promptDone, question.choices, handleChoice]);

  const handleReset = () => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Reset all progress and scores to default?")
    ) {
      resetProgress();
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-[#e0e0e0]">
      <SimulatorHeader onAbout={() => setAboutOpen(true)} />

      <SimulatorHero
        stats={
          <>
            <ProgressBar label="Energy" value={energy} />
            <ProgressBar label="Success" value={success} />
          </>
        }
      />

      <div className="mx-3 mb-3 flex-1 border-0 bg-[#00ff00e6] px-4 py-4 font-panel text-sm leading-relaxed text-black sm:mx-4 sm:text-base">
        <p className="whitespace-pre-wrap">{typedPrompt}</p>
        {hasAnswered && (
          <p className="mt-4 border-2 border-[#ff00ff] bg-black px-2 py-2 font-panel text-[10px] text-[#ff00ff] sm:text-xs">
            You already chose an option for this scenario. Stats were updated
            earlier. Use Reset Progress on the landing page to play again from
            scratch.
          </p>
        )}
      </div>

      <div className="mx-3 mb-4 flex flex-col gap-2 sm:mx-4">
        {question.choices.map((choice, i) => (
          <button
            key={choice.id}
            type="button"
            disabled={hasAnswered || !promptDone}
            onClick={() => handleChoice(choice.energyDelta, choice.successDelta)}
            className="font-panel border-2 border-[#ff00ff] bg-black px-3 py-3 text-left text-[10px] leading-snug text-white transition-opacity enabled:hover:bg-[#1a0a1a] disabled:cursor-not-allowed disabled:opacity-40 sm:text-xs"
          >
            <span className="text-[#ffff00]">[{i + 1}]</span> {choice.label}
          </button>
        ))}
      </div>

      <SimulatorFooter onReset={handleReset} />

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
