"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ProgressBar } from "@/components/ProgressBar";
import { SimulatorFooter } from "@/components/SimulatorFooter";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { SimulatorHero } from "@/components/SimulatorHero";
import { useSimulatorStore } from "@/store/simulator-store";

export function ScenarioCompleteScreen() {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ready, setReady] = useState(false);

  const energy = useSimulatorStore((s) => s.energy);
  const success = useSimulatorStore((s) => s.success);
  const resetProgress = useSimulatorStore((s) => s.resetProgress);

  const survived = energy > 0 && success > 0;

  useEffect(() => {
    const unsub = useSimulatorStore.persist.onFinishHydration(() => {
      setReady(true);
    });
    if (useSimulatorStore.persist.hasHydrated()) {
      setReady(true);
    }
    return unsub;
  }, []);

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
            <ProgressBar label="Energy" value={energy} />
            <ProgressBar label="Success" value={success} />
          </>
        }
      />

      <div className="mx-3 mb-4 flex-1 border-0 bg-[#00ff00e6] px-4 py-4 font-panel text-sm leading-relaxed text-black sm:mx-4 sm:text-base">
        {survived ? (
          <p className="whitespace-pre-wrap">
            congratulations! you&apos;ve made it through the program and will
            graduate in a month, and hopefully receive licensure in a few.
            please record your scores and prepare for a discussion with the
            class. click &quot;Reset Progress&quot; at the bottom of the screen
            if you would like to move through the scenarios one more time.
          </p>
        ) : (
          <p className="whitespace-pre-wrap">
            You&apos;ve reached the end of the scenarios. At least one of your
            scores is no longer above zero. Use &quot;Reset Progress&quot; at
            the bottom of the screen to restart the simulation.
          </p>
        )}
      </div>

      <div className="mx-3 mb-4 sm:mx-4">
        <Link
          href="/"
          className="font-panel block w-full border-2 border-[#ff00ff] bg-black px-4 py-3 text-center text-[10px] uppercase tracking-wide text-[#ff00ff] transition-opacity hover:bg-[#1a0a1a] sm:text-xs"
        >
          Return to start
        </Link>
      </div>

      <SimulatorFooter onReset={handleReset} />

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
