"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSimulatorStore } from "@/store/simulator-store";

export function ScenarioGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const completed = useSimulatorStore((s) => s.hspQuizCompleted);

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
    if (!completed) router.replace("/quiz/intro");
  }, [ready, completed, router]);

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black font-mono text-sm text-[#00ff00]">
        Loading…
      </div>
    );
  }
  if (!completed) return null;
  return <>{children}</>;
}
