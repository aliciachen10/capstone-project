"use client";

type SimulatorHeaderProps = {
  onAbout: () => void;
};

export function SimulatorHeader({ onAbout }: SimulatorHeaderProps) {
  return (
    <header className="flex shrink-0 items-start justify-between gap-4 border-b-2 border-[#00ff00] px-3 py-2 sm:px-4">
      <div className="clip-banner bg-[#ffff00] px-3 py-1.5 text-black">
        <h1 className="title-flash max-w-[min(100vw-8rem,28rem)] text-[10px] leading-tight tracking-tight sm:text-xs md:text-sm">
          Counseling Student Simulator
        </h1>
      </div>
      <button
        type="button"
        onClick={onAbout}
        className="shrink-0 border-2 border-[#00ff00] bg-[#0000ff] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00ff00] hover:bg-[#0000cc] sm:text-xs"
      >
        About
      </button>
    </header>
  );
}
