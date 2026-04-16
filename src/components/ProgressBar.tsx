type ProgressBarProps = {
  label: string;
  value: number;
  /** When false, width updates without CSS transition (for frame-by-frame intro animation). */
  smoothWidth?: boolean;
  /** Optional delta shown as (+N) / (-N) next to the value. */
  delta?: number | null;
};

export function ProgressBar({
  label,
  value,
  smoothWidth = true,
  delta = null,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  const showDelta = typeof delta === "number" && !Number.isNaN(delta) && delta !== 0;
  const deltaText = showDelta ? `(${delta > 0 ? "+" : ""}${delta})` : "";
  const deltaClass = !showDelta
    ? ""
    : delta > 0
      ? "text-[#00ff00]"
      : "text-[#ff4444]";

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
      <div className="flex w-[5.25rem] shrink-0 items-center justify-end gap-1 tabular-nums">
        <span className="w-8 text-right text-white">{clamped}</span>
        <span className={`w-12 text-left ${deltaClass}`}>{deltaText}</span>
      </div>
    </div>
  );
}
