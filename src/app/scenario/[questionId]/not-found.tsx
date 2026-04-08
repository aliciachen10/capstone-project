import Link from "next/link";

export default function ScenarioNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-8 font-mono text-sm text-[#ff0000]">
      <p>That scenario does not exist.</p>
      <Link
        href="/"
        className="mt-6 border-2 border-[#00ff00] px-4 py-2 text-[#00ff00] hover:bg-[#0a1a0a]"
      >
        Return home
      </Link>
    </div>
  );
}
