import { notFound } from "next/navigation";
import { QuizScreen } from "@/components/QuizScreen";
import { HSP_QUIZ_COUNT } from "@/data/hsp-quiz";

export default async function QuizQuestionPage({
  params,
}: {
  params: Promise<{ questionNum: string }>;
}) {
  const { questionNum: raw } = await params;
  const n = parseInt(raw, 10);
  if (Number.isNaN(n) || n < 1 || n > HSP_QUIZ_COUNT) {
    notFound();
  }
  return <QuizScreen questionNum={n} />;
}
