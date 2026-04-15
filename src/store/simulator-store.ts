import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  computeEnergyFromHspTrueCount,
  countHspTrueAnswers,
  HSP_QUIZ_COUNT,
} from "@/data/hsp-quiz";
import { SELF_CARE_COUNT } from "@/data/self-care-quiz";

const emptyQuizAnswers = (): (boolean | null)[] =>
  Array.from({ length: HSP_QUIZ_COUNT }, () => null);
const emptySelfCareSelections = (): boolean[] =>
  Array.from({ length: SELF_CARE_COUNT }, () => false);

const INITIAL = {
  energy: 0,
  success: 50,
  answeredQuestionIds: [] as string[],
  hspQuizAnswers: emptyQuizAnswers(),
  hspQuizCompleted: false,
  selfCareSelections: emptySelfCareSelections(),
  selfCarePointsAdded: 0,
  selfCareQuizCompleted: false,
};

export type SimulatorState = {
  energy: number;
  success: number;
  answeredQuestionIds: string[];
  hspQuizAnswers: (boolean | null)[];
  hspQuizCompleted: boolean;
  selfCareSelections: boolean[];
  selfCarePointsAdded: number;
  selfCareQuizCompleted: boolean;
  setEnergy: (value: number) => void;
  setSuccess: (value: number) => void;
  adjustEnergy: (delta: number) => void;
  adjustSuccess: (delta: number) => void;
  markQuestionAnswered: (questionId: string) => void;
  hasAnsweredQuestion: (questionId: string) => boolean;
  setHspAnswer: (index: number, value: boolean) => void;
  finalizeHspQuiz: () => void;
  toggleSelfCareSelection: (index: number) => void;
  finalizeSelfCareQuiz: (points: number) => void;
  resetProgress: () => void;
};

export const useSimulatorStore = create<SimulatorState>()(
  persist(
    (set, get) => ({
      ...INITIAL,
      setEnergy: (energy) =>
        set({ energy: Math.max(0, Math.min(100, Math.round(energy))) }),
      setSuccess: (success) =>
        set({ success: Math.max(0, Math.min(100, Math.round(success))) }),
      adjustEnergy: (delta) =>
        set((s) => ({
          energy: Math.max(0, Math.min(100, Math.round(s.energy + delta))),
        })),
      adjustSuccess: (delta) =>
        set((s) => ({
          success: Math.max(0, Math.min(100, Math.round(s.success + delta))),
        })),
      markQuestionAnswered: (questionId) =>
        set((s) => ({
          answeredQuestionIds: s.answeredQuestionIds.includes(questionId)
            ? s.answeredQuestionIds
            : [...s.answeredQuestionIds, questionId],
        })),
      hasAnsweredQuestion: (questionId) =>
        get().answeredQuestionIds.includes(questionId),
      setHspAnswer: (index, value) =>
        set((s) => {
          const next = [...s.hspQuizAnswers];
          if (index < 0 || index >= HSP_QUIZ_COUNT) return s;
          next[index] = value;
          return { hspQuizAnswers: next };
        }),
      finalizeHspQuiz: () => {
        const answers = get().hspQuizAnswers;
        const trueCount = countHspTrueAnswers(answers);
        const energy = computeEnergyFromHspTrueCount(trueCount);
        set({ energy, hspQuizCompleted: true });
      },
      toggleSelfCareSelection: (index) =>
        set((s) => {
          if (index < 0 || index >= SELF_CARE_COUNT) return s;
          const next = [...s.selfCareSelections];
          next[index] = !next[index];
          return { selfCareSelections: next };
        }),
      finalizeSelfCareQuiz: (points) =>
        set((s) => {
          const boundedPoints = Math.max(0, Math.round(points));
          const nextEnergy = Math.max(
            0,
            Math.min(100, Math.round(s.energy + boundedPoints)),
          );
          return {
            energy: nextEnergy,
            selfCarePointsAdded: boundedPoints,
            selfCareQuizCompleted: true,
          };
        }),
      resetProgress: () => set(INITIAL),
    }),
    {
      name: "counseling-student-simulator",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        energy: state.energy,
        success: state.success,
        answeredQuestionIds: state.answeredQuestionIds,
        hspQuizAnswers: state.hspQuizAnswers,
        hspQuizCompleted: state.hspQuizCompleted,
        selfCareSelections: state.selfCareSelections,
        selfCarePointsAdded: state.selfCarePointsAdded,
        selfCareQuizCompleted: state.selfCareQuizCompleted,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<SimulatorState>;
        const mergedAnswers =
          Array.isArray(p.hspQuizAnswers) &&
          p.hspQuizAnswers.length === HSP_QUIZ_COUNT
            ? (p.hspQuizAnswers as (boolean | null)[])
            : emptyQuizAnswers();
        const completed = Boolean(p.hspQuizCompleted);
        const selfCareCompleted = Boolean(p.selfCareQuizCompleted);
        const energy =
          completed && typeof p.energy === "number"
            ? Math.max(0, Math.min(100, Math.round(p.energy)))
            : 0;
        const mergedSelfCareSelections =
          Array.isArray(p.selfCareSelections) &&
          p.selfCareSelections.length === SELF_CARE_COUNT
            ? p.selfCareSelections.map(Boolean)
            : emptySelfCareSelections();
        return {
          ...current,
          ...p,
          energy,
          answeredQuestionIds: Array.isArray(p.answeredQuestionIds)
            ? p.answeredQuestionIds
            : [],
          hspQuizAnswers: mergedAnswers,
          hspQuizCompleted: completed,
          selfCareSelections: mergedSelfCareSelections,
          selfCarePointsAdded:
            selfCareCompleted && typeof p.selfCarePointsAdded === "number"
              ? Math.max(0, Math.round(p.selfCarePointsAdded))
              : 0,
          selfCareQuizCompleted: selfCareCompleted,
        };
      },
    },
  ),
);
