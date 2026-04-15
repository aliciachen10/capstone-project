import { notFound } from "next/navigation";
import { ScenarioConsequenceScreen } from "@/components/ScenarioConsequenceScreen";
import { getChoice, getNextQuestionId } from "@/data/question-bank";

function parseStatParam(v: string | undefined): number | undefined {
  if (v == null || v === "") return undefined;
  const n = Number.parseInt(v, 10);
  if (Number.isNaN(n)) return undefined;
  return Math.max(0, Math.min(100, n));
}

export default async function ScenarioConsequencePage({
  searchParams,
}: {
  searchParams: Promise<{
    questionId?: string;
    choiceId?: string;
    fromEnergy?: string;
    fromSuccess?: string;
  }>;
}) {
  const { questionId, choiceId, fromEnergy: fromEnergyRaw, fromSuccess: fromSuccessRaw } =
    await searchParams;
  if (!questionId || !choiceId) notFound();

  const choice = getChoice(questionId, choiceId);
  if (!choice) notFound();

  const next = getNextQuestionId(questionId);
  const nextHref = next ? `/scenario/${next}` : "/scenario/complete";

  return (
    <ScenarioConsequenceScreen
      consequenceText={choice.consequenceText}
      nextHref={nextHref}
      fromEnergy={parseStatParam(fromEnergyRaw)}
      fromSuccess={parseStatParam(fromSuccessRaw)}
    />
  );
}
