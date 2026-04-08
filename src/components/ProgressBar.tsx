type ProgressBarProps = {
  label: string;
  value: number;
  /** When false, width updates without CSS transition (for frame-by-frame intro animation). */
  smoothWidth?: boolean;
};

export function ProgressBar({ label, value, smoothWidth = true }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className="flex w-full max-w-md items-center gap-3 font-mono text-[10px] uppercase tracking-wide text-[#00ff00] sm:text-xs">
      <span className="w-24 shrink-0 text-right">{label}</span>
      <div className="relative h-4 min-w-0 flex-1 border border-white bg-[#1a1a1a]">
        <div
          className={
            smoothWidth
              ? "h-full bg-[#ffff00] transition-[width] duration-300 ease-out"
              : "h-full bg-[#ffff00]"
          }
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className="w-8 shrink-0 tabular-nums text-white">{clamped}</span>
    </div>
  );
}
