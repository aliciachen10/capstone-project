"use client";

import Image from "next/image";
import { Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type CrtHeroImagePanelProps = {
  crtImageSrc: string;
};

/**
 * CRT image + overlays. Re-mounts on pathname/search change so the tune-in
 * animation runs on every navigation (new question, consequence, etc.).
 */
function CrtHeroImagePanelInner({ crtImageSrc }: CrtHeroImagePanelProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const routeKey = `${pathname}?${searchParams.toString()}`;

  return (
    <div key={routeKey} className="relative h-full w-full bg-black">
      <div className="crt-tv-screen-shape crt-tune-in relative h-full w-full overflow-hidden">
        <Image
          src={crtImageSrc}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 384px"
          className="object-cover object-center"
          priority={false}
        />
        <div className="crt-vignette absolute inset-0" aria-hidden />
        <div className="crt-scanlines absolute inset-0 opacity-70" aria-hidden />
        <div
          className="crt-noise crt-overlay-flicker absolute inset-0 opacity-45"
          aria-hidden
        />
        <div
          className="crt-noise crt-static-buzz crt-static-shift absolute inset-0 opacity-35 mix-blend-overlay"
          aria-hidden
        />
        <div className="crt-chromatic-edge absolute inset-0" aria-hidden />
      </div>
    </div>
  );
}

function CrtHeroImageFallback() {
  return (
    <div className="relative h-full w-full bg-black">
      <div className="crt-tv-screen-shape relative flex h-full w-full items-center justify-center overflow-hidden">
        <div className="crt-noise absolute inset-0 opacity-50" aria-hidden />
      </div>
    </div>
  );
}

export function CrtHeroImagePanel(props: CrtHeroImagePanelProps) {
  return (
    <Suspense fallback={<CrtHeroImageFallback />}>
      <CrtHeroImagePanelInner {...props} />
    </Suspense>
  );
}
