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
    explanationTitle: "🧠 Psychotherapy (CBT and Positive Psychology) — Well-Validated",
    explanationBody: `A landmark meta-analysis of 419 RCTs (n = 53,288) found that mindfulness-based and multi-component positive psychological interventions demonstrated the greatest efficacy for wellbeing in both clinical and non-clinical populations. Singular positive psychology interventions, CBT-based, ACT-based, and reminiscence interventions were also impactful, though effect sizes tended to be small to moderate.`,
  },
  {
    id: "exercise",
    label:
      "Exercise 3-6+ x a week (including aerobic exercise like running, swimming, biking; resistance training; yoga)",
    points: 3,
    explanationTitle: "🏋️ Exercise — Among the Strongest Overall",
    explanationBody: `Exercise consistently shows some of the largest effects of any self-directed intervention. A 2025 meta-analysis of 25 studies found that exercise had a large effect on depressive symptoms (SMD = −0.97), and a significant moderate effect on anxiety. Resistance training specifically showed particularly striking results in younger people — Hedge's g = −1.06 for depression and −1.02 for anxiety, both large effects.

A broader umbrella review of 375 RCTs involving 38,000 children and adolescents found moderate effects favoring exercise for both depression (SMD = −0.45) and anxiety (SMD = −0.39), with mixed-mode and moderate-intensity exercise having the largest effects on depression, while resistance exercise was most effective for anxiety.

Bottom line: Both aerobic and resistance training work well, and combining them may be optimal. Meeting WHO guidelines (150+ min moderate aerobic/week + 2 strength sessions) appears to maximize the benefit.`,
  },
  {
    id: "meditation",
    label: "Meditation (at least three times a week)",
    points: 2,
    explanationTitle: "Mindfulness Meditation / Contemplative Practices",
    explanationBody: `Effect size: Moderate to large
Best types: Mindfulness-Based Stress Reduction (MBSR), breath-focused meditation, loving-kindness
Duration: 10–30 minutes/day, over 8+ weeks
Meta-analysis: Goyal et al., 2014 – Mindfulness reduces anxiety, depression, and pain
Mechanism: Decreases rumination, improves self-regulation`,
  },
  {
    id: "social",
    label:
      "Hanging out with friends outside of class, internship, or work environment (at least a few times a week)",
    points: 2,
    explanationTitle: "Social Connection and Support",
    explanationBody: `Effect size: Moderate to large
Forms: Meaningful friendships, group belonging, support groups, family time
Mechanism: Oxytocin release, buffering stress response, increasing resilience
Meta-analysis: Holt-Lunstad et al., 2015 – Social isolation predicts mortality as much as smoking or obesity
Social connection is less of a single "intervention" and more of a fundamental health factor. A comprehensive review found that loneliness had medium to large effects on all health outcomes, with the largest effects on mental health and overall wellbeing. PubMed
Robust evidence documents social connection as an independent predictor of mental and physical health, with some of the strongest evidence pointing toward mortality. A systematic review of 32 longitudinal studies found that the odds of developing new depression were more than double among those who often felt lonely compared to those who rarely did — and Mendelian randomization studies suggest loneliness causally produces major depression and depressive symptoms.
In practical terms, this means that actively nurturing close relationships, joining community groups, volunteering, or any regular face-to-face interaction with others is one of the highest-leverage things a person can do for long-term mental health.`,
  },
  {
    id: "nature",
    label: "Getting out into nature 3+ times a week",
    points: 2,
    explanationTitle: "Time in Nature / Green Space",
    explanationBody: `Effect size: Moderate
Best practices: 20+ minutes in nature 3+ times per week
Mechanism: Reduces rumination and amygdala activation; increases positive affect
Research: Berman et al., 2012 – Nature exposure improves mood and cognitive function
A 2024 meta-analysis found a moderately sized effect of nature exposure on adults with symptoms of mental illness, suggesting healthcare professionals should consider integrating time in natural environments into treatment plans.
A review covering the pandemic period found that access to gardens was associated with roughly 29% lower odds of depression and 27% lower odds of anxiety, while increased time in green spaces was associated with lower stress levels.
Even short doses matter: just 5 minutes of exercise in a green space has been shown to significantly improve self-esteem and mood. Nature prescription programs — where clinicians formally recommend time in parks or natural areas — show moderate to large effects on depression and anxiety scores. Notably, exposure to virtual natural environments also reduces anxiety (large effect: SMD = 0.82), stress (moderate), and depression (moderate) in healthy adults, which is useful for people without easy access to green spaces.`,
  },
  {
    id: "sleep",
    label: "Sleeping 7+ hours a night consistently",
    points: 2,
    explanationTitle: "Sleep Hygiene & Adequate Rest",
    explanationBody: `Effect size: Large (chronic sleep deprivation is directly linked to depression/anxiety)
Strategies: Consistent bedtime, limiting screen time, cool/dark/quiet environment
Mechanism: Regulates cortisol, amygdala reactivity, and emotional regulation
RCTs: Improving sleep improves mood outcomes (Harvey et al., 2014)

Sleep Improvement — Strongly Underrated
This deserves its own prominent place on the list. A major meta-analysis of randomized controlled trials found that improving sleep produced a medium effect on composite mental health (g = −0.53), with particularly strong effects on depression (g = −0.63), anxiety (g = −0.51), and rumination (g = −0.49). Crucially, the research found a clear dose-response relationship — the more sleep quality improved, the more mental health improved.
The evidence suggests sleep is causally related to mental health difficulties, with interventions improving sleep showing significant effects on depression, anxiety, stress, and even positive psychosis symptoms.`,
  },
  {
    id: "journaling",
    label: "Journaling",
    points: 1,
    explanationTitle: "Cognitive Restructuring / Journaling",
    explanationBody: `Effect size: Moderate
Forms: Gratitude journaling, expressive writing, CBT-style thought records
Mechanism: Enhances meaning-making, emotional processing, self-awareness
Research: Pennebaker & Chung (2011) – Expressive writing improves immune and emotional outcomes`,
  },
  {
    id: "gratitude",
    label: "Gratitude practices (at least 3 times a week)",
    points: 1,
    explanationTitle: "🙏 Gratitude Practices — Small but Accessible",
    explanationBody: `A systematic review found that gratitude interventions produced 6.86% higher life satisfaction scores, 5.8% better mental health scores, and 7.76% lower anxiety symptoms compared to controls. The effects are modest by clinical standards, but gratitude is essentially zero-cost and zero-risk, making it a high value-to-effort ratio tool. Longer-duration and more varied gratitude programs (4–6 weeks) produce moderate to large effects, suggesting a dose-response relationship.`,
  },
];

export const SELF_CARE_COUNT = SELF_CARE_ACTIVITIES.length;

export const SELF_CARE_INTRO_COPY =
  "Now you'll indicate which of the following self-care activities that you participate in on a regular basis.";
