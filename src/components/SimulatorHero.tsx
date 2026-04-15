import type { ReactNode } from "react";
import { CrtHeroImagePanel } from "@/components/CrtHeroImagePanel";

const DEFAULT_CRT_IMAGE = "/counseling_session.png";

export type SimulatorHeroProps = {
  stats: ReactNode;
  /**
   * `title` — original stacked “Counseling Student Simulator” copy (landing only).
   * `crt-image` — center-cropped square image with CRT static overlay (all other screens).
   */
  heroMode?: "title" | "crt-image";
  /** Public path under `/public` (e.g. `/counseling_session.png`). Used when `heroMode` is `crt-image`. */
  crtImageSrc?: string;
};

export function SimulatorHero({
  stats,
  heroMode = "crt-image",
  crtImageSrc = DEFAULT_CRT_IMAGE,
}: SimulatorHeroProps) {
  return (
    <section className="flex flex-1 flex-col gap-4 px-3 py-4 sm:flex-row sm:px-4 sm:py-6">
      <div className="crt-frame crt-tv-shell relative flex aspect-square w-full max-w-xs shrink-0 items-center justify-center overflow-hidden sm:max-w-sm">
        {heroMode === "title" ? (
          <>
            <div className="crt-noise absolute inset-0 opacity-40" aria-hidden />
            <p className="relative z-10 px-2 text-center text-lg font-bold leading-tight text-[#ff0000] [text-shadow:2px_2px_0_#000] sm:text-2xl md:text-3xl">
              Counseling
              <br />
              Student
              <br />
              Simulator
            </p>
          </>
        ) : (
          <CrtHeroImagePanel crtImageSrc={crtImageSrc} />
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3">
        <h2 className="text-center text-sm font-bold uppercase tracking-[0.2em] text-[#00ff00] sm:text-base">
          Stats
        </h2>
        <div className="mx-auto flex w-full max-w-md flex-col gap-2">
          {stats}
        </div>
      </div>
    </section>
  );
}
