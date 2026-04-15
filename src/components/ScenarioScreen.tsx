"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ProgressBar } from "@/components/ProgressBar";
import { SimulatorFooter } from "@/components/SimulatorFooter";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { SimulatorHero } from "@/components/SimulatorHero";
import type { Question } from "@/data/question-bank";
import { countHspTrueAnswers } from "@/data/hsp-quiz";
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
  const setEnergy = useSimulatorStore((s) => s.setEnergy);
  const setSuccess = useSimulatorStore((s) => s.setSuccess);
  const hasAnswered = useSimulatorStore((s) =>
    s.hasAnsweredQuestion(question.id),
  );
  const markAnswered = useSimulatorStore((s) => s.markQuestionAnswered);
  const resetProgress = useSimulatorStore((s) => s.resetProgress);
  const hspQuizAnswers = useSimulatorStore((s) => s.hspQuizAnswers);

  const resolvedPrompt = useMemo(() => {
    const spsScore = countHspTrueAnswers(hspQuizAnswers);
    return question.prompt.replace(/\{\{SPS_SCORE\}\}/g, String(spsScore));
  }, [question.prompt, hspQuizAnswers]);

  const { displayed: typedPrompt, done: promptDone } =
    useTypewriter(resolvedPrompt);

  const handleChoice = useCallback(
    (choiceId: string, energyDelta: number, successDelta: number) => {
      if (hasAnswered || !promptDone) return;
      const nextEnergy = Math.max(
        0,
        Math.min(100, Math.round(energy + energyDelta)),
      );
      const nextSuccess = Math.max(
        0,
        Math.min(100, Math.round(success + successDelta)),
      );
      setEnergy(nextEnergy);
      setSuccess(nextSuccess);
      markAnswered(question.id);
      if (nextEnergy === 0 || nextSuccess === 0) {
        const depleted = nextEnergy === 0 ? "energy" : "success";
        router.push(`/scenario/lost?stat=${depleted}`);
      } else {
        router.push(
          `/scenario/consequence?questionId=${encodeURIComponent(
            question.id,
          )}&choiceId=${encodeURIComponent(choiceId)}&fromEnergy=${Math.round(energy)}&fromSuccess=${Math.round(success)}`,
        );
      }
    },
    [
      energy,
      success,
      hasAnswered,
      promptDone,
      setEnergy,
      setSuccess,
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
      handleChoice(choice.id, choice.energyDelta, choice.successDelta);
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
            onClick={() =>
              handleChoice(choice.id, choice.energyDelta, choice.successDelta)
            }
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
