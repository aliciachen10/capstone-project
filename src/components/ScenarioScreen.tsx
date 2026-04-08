"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ProgressBar } from "@/components/ProgressBar";
import { SimulatorFooter } from "@/components/SimulatorFooter";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { SimulatorHero } from "@/components/SimulatorHero";
import type { Question } from "@/data/question-bank";
import { getNextQuestionId } from "@/data/question-bank";
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

  const handleChoice = (energyDelta: number, successDelta: number) => {
    if (hasAnswered) return;
    adjustEnergy(energyDelta);
    adjustSuccess(successDelta);
    markAnswered(question.id);
    const next = getNextQuestionId(question.id);
    if (next) {
      router.push(`/scenario/${next}`);
    } else {
      router.push("/scenario/complete");
    }
  };

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
            <ProgressBar label="Energy" value={energy} />
            <ProgressBar label="Success" value={success} />
          </>
        }
      />

      <div className="mx-3 mb-3 flex-1 border-0 bg-[#00ff00e6] px-4 py-4 text-sm leading-relaxed text-black sm:mx-4 sm:text-base">
        <p className="whitespace-pre-wrap">{question.prompt}</p>
        {hasAnswered && (
          <p className="mt-4 border-2 border-[#ff00ff] bg-black px-2 py-2 text-[10px] text-[#ff00ff] sm:text-xs">
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
            disabled={hasAnswered}
            onClick={() => handleChoice(choice.energyDelta, choice.successDelta)}
            className="border-2 border-[#ff00ff] bg-black px-3 py-3 text-left text-[10px] leading-snug text-white transition-opacity hover:bg-[#1a0a1a] disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
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
