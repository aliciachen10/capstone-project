export type SelfCareActivity = {
  id: string;
  label: string;
  points: number;
  explanationTitle: string;
  explanationBody: string;
};

export const SELF_CARE_ACTIVITIES: SelfCareActivity[] = [
  {
    id: "therapy",
    label: "Weekly or biweekly therapy",
    points: 3,
    explanationTitle: "Psychotherapy (CBT and Positive Psychology) - Well-Validated",
    explanationBody:
      "A landmark meta-analysis of 419 randomized controlled trials (n = 53,288) found mindfulness-based and multi-component positive psychological interventions had strong efficacy for wellbeing in both clinical and non-clinical populations. CBT-based and ACT-based interventions also produced meaningful gains, usually in the small-to-moderate range.",
  },
  {
    id: "exercise",
    label:
      "Exercise 3-6+ x a week (including aerobic exercise like running, swimming, biking; resistance training; yoga)",
    points: 3,
    explanationTitle: "Exercise - Among the Strongest Overall",
    explanationBody:
      "Exercise consistently shows some of the largest effects among self-directed mental health interventions. A 2025 meta-analysis found a large effect on depressive symptoms, plus moderate anxiety improvements. Across many trials in youth, mixed-mode and moderate-intensity exercise support depression outcomes, while resistance training can be especially strong for anxiety.",
  },
  {
    id: "meditation",
    label: "Meditation (at least three times a week)",
    points: 2,
    explanationTitle: "Mindfulness Meditation / Contemplative Practices",
    explanationBody:
      "Mindfulness approaches such as breath-focused practice and MBSR show moderate-to-large effects for anxiety and depression. Benefits appear to build with regular practice over weeks by reducing rumination and improving self-regulation.",
  },
  {
    id: "social",
    label:
      "Hanging out with friends outside of class, internship, or work environment (at least a few times a week)",
    points: 2,
    explanationTitle: "Social Connection and Support",
    explanationBody:
      "Social connection is a major protective factor for long-term mental health. Large reviews show loneliness strongly predicts depression and poorer wellbeing, while regular meaningful contact improves resilience and stress buffering.",
  },
  {
    id: "nature",
    label: "Getting out into nature 3+ times a week",
    points: 2,
    explanationTitle: "Time in Nature / Green Space",
    explanationBody:
      "Nature exposure shows moderate effects on mood and stress outcomes. Even short periods in green space can improve affect, and repeated weekly exposure appears especially helpful for reducing stress and depressive symptoms.",
  },
  {
    id: "sleep",
    label: "Sleeping 7+ hours a night consistently",
    points: 2,
    explanationTitle: "Sleep Improvement - Strongly Underrated",
    explanationBody:
      "Sleep and mental health are tightly linked. Meta-analytic evidence shows improving sleep can produce medium effects across depression, anxiety, and rumination, with stronger gains when sleep quality improves more.",
  },
  {
    id: "journaling",
    label: "Journaling",
    points: 1,
    explanationTitle: "Cognitive Restructuring / Journaling",
    explanationBody:
      "Expressive writing and structured journaling support emotional processing and self-awareness. Effects are generally moderate, and regular reflection can improve meaning-making and coping.",
  },
  {
    id: "gratitude",
    label: "Gratitude practices (at least 3 times a week)",
    points: 1,
    explanationTitle: "Gratitude Practices - Small but Accessible",
    explanationBody:
      "Gratitude interventions usually produce smaller but reliable gains in life satisfaction and mental health while reducing anxiety symptoms. Because gratitude is low-cost and low-risk, it can offer strong value when done consistently.",
  },
];

export const SELF_CARE_COUNT = SELF_CARE_ACTIVITIES.length;

export const SELF_CARE_INTRO_COPY =
  "Now you'll indicate which of the following self-care activities that you participate in on a regular basis.";
