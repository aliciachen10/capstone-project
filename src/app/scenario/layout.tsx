import { ScenarioGate } from "@/components/ScenarioGate";

export default function ScenarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ScenarioGate>{children}</ScenarioGate>;
}
