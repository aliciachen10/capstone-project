"use client";

type AboutModalProps = {
  open: boolean;
  onClose: () => void;
};

export function AboutModal({ open, onClose }: AboutModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close dialog"
        onClick={onClose}
      />
      <div
        className="relative z-10 w-full max-w-lg border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#c0c0c0] shadow-[4px_4px_0_#000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          id="about-modal-title"
          className="flex items-center justify-between bg-[#000080] px-1 py-0.5 font-mono text-xs font-bold text-white sm:text-sm"
        >
          <span className="truncate pl-1">About Counseling Student Simulator</span>
          <div className="flex gap-0.5">
            <span className="flex h-5 w-5 items-center justify-center border border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#c0c0c0] text-[10px] text-black">
              _
            </span>
            <span className="flex h-5 w-5 items-center justify-center border border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#c0c0c0] text-[10px] text-black">
              □
            </span>
            <button
              type="button"
              onClick={onClose}
              className="flex h-5 w-5 items-center justify-center border border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#c0c0c0] text-[10px] font-bold text-black hover:bg-[#a0a0a0]"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
        <div className="border-2 border-t-[#404040] border-l-[#404040] border-b-white border-r-white bg-white p-4 font-sans text-xs leading-relaxed text-black sm:text-sm">
          <p className="mb-3">
            This experience is meant to simulate a counseling student&apos;s journey
            through her program and illustrate some of the challenges she has faced
            along the way. Stats update as you move through future panels; progress is
            saved in your browser.
          </p>
          <p className="mb-2 font-bold">Learn more</p>
          <ul className="list-inside list-disc space-y-1 text-[#0000ff] underline">
            <li>
              <a
                href="https://www.cdc.gov/violenceprevention/aces/index.html"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0000aa]"
              >
                Adverse Childhood Experiences (ACEs) — CDC overview
              </a>
            </li>
            <li>
              <a
                href="https://hsperson.com/test/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#0000aa]"
              >
                Sensory processing sensitivity (highly sensitive person resources)
              </a>
            </li>
          </ul>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="border-2 border-t-white border-l-white border-b-[#404040] border-r-[#404040] bg-[#c0c0c0] px-6 py-1 font-mono text-xs text-black active:border-t-[#404040] active:border-l-[#404040] active:border-b-white active:border-r-white sm:text-sm"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
