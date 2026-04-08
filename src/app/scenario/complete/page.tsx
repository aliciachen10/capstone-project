import Link from "next/link";

export default function ScenarioCompletePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-8 font-mono text-sm text-[#00ff00]">
      <p className="mb-2 max-w-md text-center leading-relaxed">
        You&apos;ve reached the end of the available scenarios for now.
      </p>
      <p className="mb-8 max-w-md text-center text-[10px] text-[#666]">
        More questions will appear here as the simulator grows.
      </p>
      <Link
        href="/"
        className="border-2 border-[#ff00ff] px-4 py-2 text-[#ff00ff] hover:bg-[#1a0a1a]"
      >
        Return to start
      </Link>
    </div>
  );
}
