/**
 * Sensory-processing sensitivity style questionnaire (HSP-inspired).
 * 26 items: first 23 from project spec; last 3 complete the set to 26.
 * Score = count of "True" answers. Energy baseline = 100 − (score × 2).
 */

export const HSP_QUIZ_CUTOFF = 12;

export const HSP_QUIZ_ITEMS: readonly string[] = [
  "I seem to be aware of subtleties in my environment.",
  "Other people’s moods affect me.",
  "I tend to be very sensitive to pain.",
  "I find myself needing to withdraw during busy days, into bed or into a darkened room or any place where I can have some privacy and relief from stimulation.",
  "I am particularly sensitive to the effects of caffeine.",
  "I am easily overwhelmed by things like bright lights, strong smells, coarse fabrics, or sirens close by.",
  "I have a rich, complex inner life.",
  "I am made uncomfortable by loud noises.",
  "I am deeply moved by the arts or music.",
  "I am conscientious.",
  "I startle easily.",
  "I get rattled when I have a lot to do in a short amount of time.",
  "When people are uncomfortable in a physical environment I tend to know what needs to be done to make it more comfortable (like changing the lighting or the seating).",
  "I am annoyed when people try to get me to do too many things at once.",
  "I try hard to avoid making mistakes or forgetting things.",
  "I make it a point to avoid violent movies and TV shows.",
  "I become unpleasantly aroused when a lot is going on around me.",
  "Being very hungry creates a strong reaction in me, disrupting my concentration or mood.",
  "Changes in my life shake me up.",
  "I notice and enjoy delicate or fine scents, tastes, sounds, works of art.",
  "I make it a high priority to arrange my life to avoid upsetting or overwhelming situations.",
  "When I must compete or be observed while performing a task, I become so nervous or shaky that I do much worse than I would otherwise.",
  "When I was a child, my parents or teachers seemed to see me as sensitive or shy.",
  "I find it difficult to let go of negative experiences.",
  "I prefer to work independently rather than in a group.",
  "I need time to process my thoughts before responding.",
] as const;

export const HSP_QUIZ_COUNT = HSP_QUIZ_ITEMS.length;

export function computeEnergyFromHspTrueCount(trueCount: number): number {
  const raw = 100 - trueCount * 2;
  return Math.max(0, Math.min(100, Math.round(raw)));
}

export function countHspTrueAnswers(
  answers: readonly (boolean | null)[],
): number {
  return answers.filter((a) => a === true).length;
}
