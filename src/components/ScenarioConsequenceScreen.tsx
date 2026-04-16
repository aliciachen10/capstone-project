"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { AboutModal } from "@/components/AboutModal";
import { ProgressBar } from "@/components/ProgressBar";
import { SimulatorFooter } from "@/components/SimulatorFooter";
import { SimulatorHeader } from "@/components/SimulatorHeader";
import { SimulatorHero } from "@/components/SimulatorHero";
import { useSimulatorStore } from "@/store/simulator-store";

const BAR_MS = 1400;

type ScenarioConsequenceScreenProps = {
  consequenceText: string;
  nextHref: string;
  crtImageSrc?: string;
  /** Pre-choice energy (0–100) for bar animation; omit to show store value with no tween. */
  fromEnergy?: number;
  /** Pre-choice success (0–100) for bar animation. */
  fromSuccess?: number;
};

export function ScenarioConsequenceScreen({
  consequenceText,
  nextHref,
  crtImageSrc,
  fromEnergy,
  fromSuccess,
}: ScenarioConsequenceScreenProps) {
  const router = useRouter();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [displayEnergy, setDisplayEnergy] = useState(0);
  const [displaySuccess, setDisplaySuccess] = useState(0);

  const energy = useSimulatorStore((s) => s.energy);
  const success = useSimulatorStore((s) => s.success);
  const resetProgress = useSimulatorStore((s) => s.resetProgress);

  const energyDelta =
    typeof fromEnergy === "number" && !Number.isNaN(fromEnergy)
      ? Math.round(energy - fromEnergy)
      : null;
  const successDelta =
    typeof fromSuccess === "number" && !Number.isNaN(fromSuccess)
      ? Math.round(success - fromSuccess)
      : null;

  useEffect(() => {
    const unsub = useSimulatorStore.persist.onFinishHydration(() => {
      setReady(true);
    });
    if (useSimulatorStore.persist.hasHydrated()) {
      setReady(true);
    }
    return unsub;
  }, []);

  useLayoutEffect(() => {
    if (!ready) return;

    const targetE = energy;
    const targetS = success;
    const hasFromE =
      typeof fromEnergy === "number" && !Number.isNaN(fromEnergy);
    const hasFromS =
      typeof fromSuccess === "number" && !Number.isNaN(fromSuccess);
    const startE = hasFromE
      ? Math.max(0, Math.min(100, Math.round(fromEnergy)))
      : targetE;
    const startS = hasFromS
      ? Math.max(0, Math.min(100, Math.round(fromSuccess)))
      : targetS;

    setDisplayEnergy(startE);
    setDisplaySuccess(startS);
  }, [ready, energy, success, fromEnergy, fromSuccess]);

  useEffect(() => {
    if (!ready) return;

    const targetE = energy;
    const targetS = success;
    const hasFromE =
      typeof fromEnergy === "number" && !Number.isNaN(fromEnergy);
    const hasFromS =
      typeof fromSuccess === "number" && !Number.isNaN(fromSuccess);
    const startE = hasFromE
      ? Math.max(0, Math.min(100, Math.round(fromEnergy)))
      : targetE;
    const startS = hasFromS
      ? Math.max(0, Math.min(100, Math.round(fromSuccess)))
      : targetS;

    if (startE === targetE && startS === targetS) return;

    let cancelled = false;
    const start = performance.now();

    function frame(now: number) {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / BAR_MS);
      const ease = 1 - (1 - t) ** 3;
      setDisplayEnergy(Math.round(startE + (targetE - startE) * ease));
      setDisplaySuccess(Math.round(startS + (targetS - startS) * ease));
      if (t < 1) {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
    return () => {
      cancelled = true;
    };
  }, [ready, energy, success, fromEnergy, fromSuccess]);

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
        crtImageSrc={crtImageSrc}
        stats={
          <>
            <ProgressBar
              label="Energy"
              value={displayEnergy}
              delta={energyDelta}
            />
            <ProgressBar
              label="Success"
              value={displaySuccess}
              delta={successDelta}
            />
          </>
        }
      />

      <div className="mx-3 mb-4 flex-1 border-0 bg-[#00ff00e6] px-4 py-4 font-panel text-sm leading-relaxed text-black sm:mx-4 sm:text-base">
        <p className="whitespace-pre-wrap">{consequenceText}</p>
      </div>

      <div className="mx-3 mb-4 sm:mx-4">
        <Link
          href={nextHref}
          className="font-panel block w-full border-2 border-[#00ff00] bg-black px-4 py-3 text-center text-[10px] uppercase tracking-wide text-[#00ff00] transition-opacity hover:bg-[#0a1a0a] sm:text-xs"
        >
          Continue
        </Link>
      </div>

      <SimulatorFooter onReset={handleReset} />

      <AboutModal open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}
