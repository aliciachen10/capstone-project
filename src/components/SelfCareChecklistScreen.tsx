"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ProgressBar } from "@/components/ProgressBar";
import { SimulatorFooter } from "@/components/SimulatorFooter";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { SimulatorHero } from "@/components/SimulatorHero";
import { SELF_CARE_ACTIVITIES } from "@/data/self-care-quiz";
import { useSimulatorStore } from "@/store/simulator-store";

export function SelfCareChecklistScreen() {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const success = useSimulatorStore((s) => s.success);
  const energy = useSimulatorStore((s) => s.energy);
  const hspQuizCompleted = useSimulatorStore((s) => s.hspQuizCompleted);
  const selfCareQuizCompleted = useSimulatorStore((s) => s.selfCareQuizCompleted);
  const selections = useSimulatorStore((s) => s.selfCareSelections);
  const toggleSelfCareSelection = useSimulatorStore((s) => s.toggleSelfCareSelection);
  const finalizeSelfCareQuiz = useSimulatorStore((s) => s.finalizeSelfCareQuiz);
  const resetProgress = useSimulatorStore((s) => s.resetProgress);

  const totalPoints = useMemo(
    () =>
      selections.reduce(
        (sum, selected, index) =>
          selected ? sum + SELF_CARE_ACTIVITIES[index].points : sum,
        0,
      ),
    [selections],
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
    if (!hspQuizCompleted) {
      router.replace("/quiz/intro");
      return;
    }
    if (selfCareQuizCompleted) {
      router.replace("/quiz/self-care/results");
    }
  }, [ready, hspQuizCompleted, selfCareQuizCompleted, router]);

  const handleReset = () => {
    if (
      typeof window !== "undefined" &&
      window.confirm("Reset all progress and scores to default?")
    ) {
      resetProgress();
      router.push("/");
    }
  };

  const handleSubmit = () => {
    finalizeSelfCareQuiz(totalPoints);
    router.push("/quiz/self-care/results");
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
            <ProgressBar label="Energy" value={energy} smoothWidth={false} />
            <ProgressBar label="Success" value={success} />
          </>
        }
      />

      <div className="mx-3 mb-4 flex-1 border-0 bg-[#00ff00e6] px-4 py-4 font-panel text-sm leading-relaxed text-black sm:mx-4 sm:text-base">
        <p className="mb-3 whitespace-pre-wrap">Do you do any of the following?</p>

        <div className="space-y-2">
          {SELF_CARE_ACTIVITIES.map((activity, index) => {
            const checked = selections[index];
            return (
              <label
                key={activity.id}
                className="flex cursor-pointer items-start gap-2 text-xs leading-snug sm:text-sm"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleSelfCareSelection(index)}
                  className="mt-[2px] h-4 w-4 accent-black"
                />
                <span>{activity.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="mx-3 mb-4 sm:mx-4">
        <button
          type="button"
          onClick={handleSubmit}
          className="font-panel w-full border-2 border-[#00ff00] bg-black px-4 py-3 text-center text-[10px] uppercase tracking-wide text-[#00ff00] transition-opacity enabled:hover:bg-[#0a1a0a] sm:text-xs"
        >
          Submit
        </button>
      </div>

      <SimulatorFooter onReset={handleReset} />

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
