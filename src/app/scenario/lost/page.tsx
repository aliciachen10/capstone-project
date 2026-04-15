import { ScenarioLostScreen } from "@/components/ScenarioLostScreen";

export default async function ScenarioLostPage({
  searchParams,
}: {
  searchParams: Promise<{ stat?: string }>;
}) {
  const { stat } = await searchParams;
  const normalized = stat === "success" ? "success" : "energy";
  return <ScenarioLostScreen stat={normalized} />;
}
