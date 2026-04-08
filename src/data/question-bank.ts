/**
 * Central question bank: prompts, choices, and stat deltas.
 * Add new questions to `QUESTION_ORDER` and the `questions` record.
 */

export type Choice = {
  /** Stable id for analytics / future branching */
  id: string;
  label: string;
  energyDelta: number;
  successDelta: number;
};

export type Question = {
  id: string;
  /** Shown in the green narrative box */
  prompt: string;
  choices: Choice[];
};

export const questions: Record<string, Question> = {
  "consultancy-project": {
    id: "consultancy-project",
    prompt:
      "While you are in school, you are working at a small consultancy for technology projects and are handed a challenging project where you have to do all the work from scratch (no one has done any of this stuff before, so there are no answers or guidance online, and AI doesn’t help). During this time, you’re still balancing classes and seeing patients at your site. What do you do?",
    choices: [
      {
        id: "quit",
        label: "Quit the project",
        energyDelta: 15,
        successDelta: -20,
      },
      {
        id: "time-box",
        label:
          "Keep working on the project, but time box what you work on",
        energyDelta: -5,
        successDelta: 15,
      },
      {
        id: "delay-summer",
        label:
          "Try to delay your work on the project until the summer — when you’ll have more time to do the work",
        energyDelta: 8,
        successDelta: 5,
      },
      {
        id: "skip-classes",
        label:
          "Try to work class around the project — skip a few classes here and there, and try to spend less time on assignments and readings on the weekend",
        energyDelta: -15,
        successDelta: -10,
      },
    ],
  },
};

/** Linear order for “next question” navigation */
export const QUESTION_ORDER: string[] = ["consultancy-project"];

export function getQuestion(id: string): Question | undefined {
  return questions[id];
}

export function getNextQuestionId(currentId: string): string | null {
  const i = QUESTION_ORDER.indexOf(currentId);
  if (i === -1 || i >= QUESTION_ORDER.length - 1) return null;
  return QUESTION_ORDER[i + 1] ?? null;
}

export const FIRST_QUESTION_ID = QUESTION_ORDER[0] ?? "consultancy-project";
