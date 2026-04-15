"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ProgressBar } from "@/components/ProgressBar";
import { SimulatorFooter } from "@/components/SimulatorFooter";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { SimulatorHero } from "@/components/SimulatorHero";
import { FIRST_QUESTION_ID } from "@/data/question-bank";
import { SELF_CARE_ACTIVITIES } from "@/data/self-care-quiz";
import { useSimulatorStore } from "@/store/simulator-store";

type Explanation = {
  id: string;
  label: string;
  selected: boolean;
  title: string;
  body: string;
};

export function SelfCareResultsScreen() {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const success = useSimulatorStore((s) => s.success);
  const energy = useSimulatorStore((s) => s.energy);
  const hspQuizCompleted = useSimulatorStore((s) => s.hspQuizCompleted);
  const selfCareQuizCompleted = useSimulatorStore((s) => s.selfCareQuizCompleted);
  const selfCarePointsAdded = useSimulatorStore((s) => s.selfCarePointsAdded);
  const selections = useSimulatorStore((s) => s.selfCareSelections);
  const resetProgress = useSimulatorStore((s) => s.resetProgress);

  const explanationCards = useMemo<Explanation[]>(() => {
    const selected = SELF_CARE_ACTIVITIES.filter((_, index) => selections[index]);
    const unselected = SELF_CARE_ACTIVITIES.filter((_, index) => !selections[index]);

    const cards: Explanation[] = selected.map((item) => ({
      id: `${item.id}-selected`,
      label: item.label,
      selected: true,
      title: item.explanationTitle,
      body: item.explanationBody,
    }));

    if (unselected.length > 0) {
      const randomIndex = Math.floor(Math.random() * unselected.length);
      const randomUnselected = unselected[randomIndex];
      cards.push({
        id: `${randomUnselected.id}-not-selected`,
        label: randomUnselected.label,
        selected: false,
        title: randomUnselected.explanationTitle,
        body: randomUnselected.explanationBody,
      });
    }

    return cards;
  }, [selections]);

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
    if (!selfCareQuizCompleted) {
      router.replace("/quiz/self-care/checklist");
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

      <div className="mx-3 mb-4 flex-1 overflow-y-auto border-0 bg-[#00ff00e6] px-4 py-4 font-panel text-sm leading-relaxed text-black sm:mx-4 sm:text-base">
        <p className="mb-3 whitespace-pre-wrap">
          You just added {selfCarePointsAdded} points to your energy level based off
          the self care exercises that you marked that you participate in on a weekly
          basis. The number of points added are based on effect sizes from studies and
          meta-analyses looking at the effect of these activities on overall mental
          health and well-being. You were assigned 3 points for activities that had a
          large effect size in the research literature, 2 points for activities that had
          a moderate effect size, and 1 point for activities that had a small effect
          size.
        </p>

        <div className="space-y-3">
          {explanationCards.map((item) => (
            <section key={item.id} className="border border-black/25 bg-white/40 p-2">
              <p className="text-[10px] uppercase tracking-wide sm:text-xs">
                {item.selected ? "Selected activity" : "Try adding this next"}
              </p>
              <p className="mt-1 text-xs font-semibold sm:text-sm">{item.label}</p>
              <p className="mt-1 text-xs font-semibold sm:text-sm">{item.title}</p>
              <p className="mt-1 text-xs leading-snug sm:text-sm">{item.body}</p>
            </section>
          ))}
        </div>
      </div>

      <div className="mx-3 mb-4 sm:mx-4">
        <Link
          href={`/scenario/${FIRST_QUESTION_ID}`}
          className="font-panel block w-full border-2 border-[#00ff00] bg-black px-4 py-3 text-center text-[10px] uppercase tracking-wide text-[#00ff00] transition-opacity hover:bg-[#0a1a0a] sm:text-xs"
        >
          Continue to scenarios
        </Link>
      </div>

      <SimulatorFooter onReset={handleReset} />

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
