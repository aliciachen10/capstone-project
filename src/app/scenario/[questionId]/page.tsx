import { notFound } from "next/navigation";
import { ScenarioScreen } from "@/components/ScenarioScreen";
import { getQuestion } from "@/data/question-bank";

export default async function ScenarioQuestionPage({
  params,
}: {
  params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;
  const question = getQuestion(questionId);
  if (!question) notFound();
  return <ScenarioScreen question={question} />;
}
