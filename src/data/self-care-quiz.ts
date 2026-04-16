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
    label: "Weekly or biweekly psychotherapy",
    points: 3,
    explanationTitle: "🧠 Psychotherapy (CBT and Positive Psychology) — Well-Validated",
    explanationBody: `A landmark meta-analysis of 419 RCTs (n = 53,288) found mindfulness-based and multi-component positive psychological interventions demonstrated the greatest efficacy for wellbeing across clinical and non-clinical populations. CBT-based, ACT-based, reminiscence, and singular positive psychology interventions were also impactful, though effect sizes tended to be small-to-moderate. Clinically, this supports psychotherapy as a well-validated route for improving wellbeing and reducing distress, especially when delivered with evidence-based components and adequate “dose.”`,
  },
  {
    id: "exercise",
    label:
      "Regular exercise (including yoga, aerobic activity, and strength training)",
    points: 3,
    explanationTitle: "🏋️ Exercise — Among the Strongest Overall",
    explanationBody: `Exercise consistently shows some of the largest effects of any self-directed intervention. A 2025 meta-analysis of 25 studies found a large effect for depressive symptoms (SMD = −0.97) and a significant moderate effect for anxiety; resistance training in younger people was especially strong (Hedge's g = −1.06 for depression; −1.02 for anxiety). An umbrella review of 375 RCTs (38,000 children/adolescents) found moderate effects favoring exercise for depression (SMD = −0.45) and anxiety (SMD = −0.39), with mixed-mode/moderate-intensity strongest for depression and resistance exercise strongest for anxiety. Clinically, combining aerobic + resistance and approximating WHO guidelines (150+ min moderate aerobic/week + 2 strength sessions) appears to maximize benefit.`,
  },
  {
    id: "meditation",
    label: "Meditation",
    points: 2,
    explanationTitle: "Mindfulness Meditation / Contemplative Practices",
    explanationBody: `Mindfulness meditation tends to show moderate-to-large effects, especially when practiced consistently over time. Goyal et al. (2014) found mindfulness reduces anxiety, depression, and pain, and effects appear stronger with regular “dose” (often 10–30 minutes/day over ~8+ weeks). Clinically useful formats include MBSR, breath-focused practice, and loving-kindness, with proposed mechanisms including reduced rumination and improved self-regulation.`,
  },
  {
    id: "social",
    label:
      "Hanging out with friends outside of class, internship, or work",
    points: 2,
    explanationTitle: "Social Connection and Support",
    explanationBody: `Social connection is a moderate-to-large protective factor for mental and physical health, likely through stress-buffering and resilience pathways. Holt-Lunstad et al. (2015) found social isolation predicts mortality risk comparably to major risk factors (e.g., smoking/obesity), underscoring that connection is more of a foundational health variable than a single “intervention.” A systematic review of 32 longitudinal studies found odds of new depression were more than doubled among those often lonely versus rarely lonely, and Mendelian randomization findings suggest loneliness may be causally related to major depression/depressive symptoms. In practice, regular face-to-face contact (friends, groups, volunteering, family time) is one of the highest-leverage supports to build in.`,
  },
  {
    id: "nature",
    label: "Getting out into nature regularly",
    points: 2,
    explanationTitle: "Time in Nature / Green Space",
    explanationBody: `Nature exposure shows moderate effects, with practical “doses” often cited as ~20+ minutes, 3+ times/week, and likely mechanisms including reduced rumination/amygdala activation and increased positive affect. Berman et al. (2012) found nature exposure improves mood and cognitive function, and a 2024 meta-analysis reported a moderately sized effect among adults with mental illness symptoms. Pandemic-era reviews found garden access associated with ~29% lower odds of depression and 27% lower odds of anxiety, and even brief exposures can help (e.g., 5 minutes of green exercise improving mood/self-esteem). For people with limited access, virtual nature shows meaningful effects on anxiety (SMD = 0.82) with moderate effects for stress and depression.`,
  },
  {
    id: "sleep",
    label: "Sleeping 7+ hours a night",
    points: 2,
    explanationTitle: "Sleep Hygiene & Adequate Rest",
    explanationBody: `Sleep has large downstream relevance for mental health, with mechanisms tied to cortisol regulation, amygdala reactivity, and emotion regulation; RCT evidence supports mood improvements when sleep improves (Harvey et al., 2014). A major meta-analysis of randomized controlled trials found sleep improvement produced a medium effect on composite mental health (g = −0.53), with strong effects for depression (g = −0.63), anxiety (g = −0.51), and rumination (g = −0.49). Clinically, findings suggest a dose-response relationship (greater sleep-quality gains → larger mental health gains) and broad symptom impacts (depression, anxiety, stress, and even positive psychosis symptoms). Practical strategies include consistent bedtime, limiting screens, and a cool/dark/quiet environment.`,
  },
  {
    id: "journaling",
    label: "Journaling",
    points: 1,
    explanationTitle: "Journaling",
    explanationBody: `Journaling can have moderate effects depending on the format and consistency. Pennebaker & Chung (2011) describe expressive writing benefits for emotional outcomes (and some immune-related outcomes), with plausible mechanisms including meaning-making, emotional processing, and increased self-awareness. Clinically useful formats include CBT-style thought records, expressive writing, and structured gratitude journaling.`,
  },
  {
    id: "gratitude",
    label: "Gratitude practices",
    points: 1,
    explanationTitle: "🙏 Gratitude Practices — Small but Accessible",
    explanationBody: `A systematic review found gratitude interventions produced 6.86% higher life satisfaction, 5.8% better mental health scores, and 7.76% lower anxiety symptoms versus controls. Effects are modest by clinical standards, but gratitude is low-cost and low-risk, making it a strong value-to-effort tool clinicians can recommend. Longer-duration and more varied programs (4–6 weeks) can yield moderate-to-large effects, consistent with a dose-response relationship.`,
  },
];

export const SELF_CARE_COUNT = SELF_CARE_ACTIVITIES.length;

export const SELF_CARE_INTRO_COPY =
  "Now you'll indicate which of the following self-care activities that you participate in on a regular basis.";
