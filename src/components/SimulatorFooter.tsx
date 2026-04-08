"use client";

type SimulatorFooterProps = {
  onReset: () => void;
};

export function SimulatorFooter({ onReset }: SimulatorFooterProps) {
  return (
    <footer className="mt-auto flex flex-col items-center gap-2 px-3 pb-4 pt-2 sm:flex-row sm:justify-between sm:px-4">
      <p className="order-2 text-[10px] text-[#555] sm:order-1">
        © 2026 LOCUST CONSULTING
      </p>
      <button
        type="button"
        onClick={onReset}
        className="order-1 border-2 border-[#ff00ff] px-3 py-1.5 text-[10px] uppercase text-[#ff00ff] hover:bg-[#330033] sm:order-2 sm:text-xs"
      >
        Reset Progress
      </button>
    </footer>
  );
}
