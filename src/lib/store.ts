import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ItemKind, PersonalWord, SrsItemState } from '../types';
import { createSrsState, isDue, reviewItem, MASTERY_THRESHOLD } from './srs';

const MAX_HEARTS = 5;
const HEART_REGEN_MINUTES = 30;
const XP_PER_CORRECT = 10;
const XP_CATCHUP_BONUS = 5;
const XP_PER_LEVEL = 100;

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  earnedAt: string;
}

interface LessonResultInput {
  itemId: string;
  kind: ItemKind;
  correct: boolean;
}

interface ProgressState {
  xp: number;
  hearts: number;
  nextHeartAt: string | null;
  streak: number;
  lastActiveDate: string | null;
  dailyGoalXp: number;
  todayXp: number;
  todayDate: string;
  unlockedLevels: number[];
  srsStates: Record<string, SrsItemState>;
  badges: Badge[];
  personalWords: PersonalWord[];
  placementDone: boolean;
  comboCount: number;
  completedDialogues: string[];

  // dérivés / actions
  markDialogueComplete: (id: string) => void;
  ensureDailyReset: () => void;
  regenerateHearts: () => void;
  recordAnswer: (input: LessonResultInput) => { xpGained: number; wasCatchUp: boolean; justMastered: boolean };
  restoreHeartFromReview: () => void;
  setDailyGoal: (xp: number) => void;
  unlockLevel: (level: number) => void;
  addPersonalWord: (w: Omit<PersonalWord, 'id' | 'createdAt'>) => void;
  removePersonalWord: (id: string) => void;
  markPlacementDone: () => void;
  getSrs: (itemId: string) => SrsItemState | undefined;
  getDueItems: (kind?: ItemKind) => SrsItemState[];
  getMasteredItems: (kind?: ItemKind) => SrsItemState[];
  xpLevel: () => number;
  xpProgressInLevel: () => number;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      xp: 0,
      hearts: MAX_HEARTS,
      nextHeartAt: null,
      streak: 0,
      lastActiveDate: null,
      dailyGoalXp: 20,
      todayXp: 0,
      todayDate: todayIso(),
      unlockedLevels: [1],
      srsStates: {},
      badges: [],
      personalWords: [],
      placementDone: false,
      comboCount: 0,
      completedDialogues: [],

      markDialogueComplete: (dialogueId) =>
        set((s) => (s.completedDialogues.includes(dialogueId) ? s : { completedDialogues: [...s.completedDialogues, dialogueId] })),

      ensureDailyReset: () => {
        const today = todayIso();
        if (get().todayDate !== today) {
          set({ todayDate: today, todayXp: 0 });
        }
      },

      regenerateHearts: () => {
        const { hearts, nextHeartAt } = get();
        if (hearts >= MAX_HEARTS || !nextHeartAt) return;
        const now = Date.now();
        const target = new Date(nextHeartAt).getTime();
        if (now < target) return;
        const minutesPassed = (now - target) / 60000;
        const heartsToAdd = 1 + Math.floor(minutesPassed / HEART_REGEN_MINUTES);
        const newHearts = Math.min(MAX_HEARTS, hearts + heartsToAdd);
        const stillMissing = newHearts < MAX_HEARTS;
        set({
          hearts: newHearts,
          nextHeartAt: stillMissing ? new Date(now + HEART_REGEN_MINUTES * 60000).toISOString() : null,
        });
      },

      recordAnswer: ({ itemId, kind, correct }) => {
        get().ensureDailyReset();
        const state = get();
        const existing = state.srsStates[itemId] ?? createSrsState(itemId, kind);
        const wasAlreadyInReview = existing.repetitions === 0 && existing.wrongCount > 0;
        const quality = correct ? (state.comboCount >= 2 ? 5 : 4) : 1;
        const updated = reviewItem(existing, quality);
        const justMastered = updated.mastered && !existing.mastered;

        let xpGained = 0;
        if (correct) {
          xpGained = wasAlreadyInReview ? XP_CATCHUP_BONUS : XP_PER_CORRECT;
        }

        const today = todayIso();
        const lastActive = state.lastActiveDate;
        let streak = state.streak;
        if (lastActive !== today) {
          if (lastActive) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const wasYesterday = lastActive === yesterday.toISOString().slice(0, 10);
            streak = wasYesterday ? streak + 1 : 1;
          } else {
            streak = 1;
          }
        }

        const newBadges = [...state.badges];
        if (justMastered) {
          const masteredCountNow = Object.values({ ...state.srsStates, [itemId]: updated }).filter(
            (s) => s.mastered,
          ).length;
          if ([1, 10, 25, 50, 100].includes(masteredCountNow)) {
            newBadges.push({
              id: `mastered-${masteredCountNow}`,
              title: `${masteredCountNow} mot${masteredCountNow > 1 ? 's' : ''} mémorisé${masteredCountNow > 1 ? 's' : ''} !`,
              description: `Tu as mémorisé ${masteredCountNow} élément(s).`,
              earnedAt: new Date().toISOString(),
            });
          }
        }

        set({
          srsStates: { ...state.srsStates, [itemId]: updated },
          xp: state.xp + xpGained,
          todayXp: state.todayXp + xpGained,
          hearts: correct ? state.hearts : Math.max(0, state.hearts - 1),
          nextHeartAt: correct ? state.nextHeartAt : (state.nextHeartAt ?? new Date(Date.now() + HEART_REGEN_MINUTES * 60000).toISOString()),
          comboCount: correct ? state.comboCount + 1 : 0,
          lastActiveDate: today,
          streak,
          badges: newBadges,
        });

        return { xpGained, wasCatchUp: wasAlreadyInReview, justMastered };
      },

      restoreHeartFromReview: () => {
        set((s) => ({ hearts: Math.min(MAX_HEARTS, s.hearts + 1) }));
      },

      setDailyGoal: (xpGoal) => set({ dailyGoalXp: xpGoal }),

      unlockLevel: (level) =>
        set((s) => (s.unlockedLevels.includes(level) ? s : { unlockedLevels: [...s.unlockedLevels, level] })),

      addPersonalWord: (w) =>
        set((s) => ({
          personalWords: [
            ...s.personalWords,
            { ...w, id: `pw-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, createdAt: new Date().toISOString() },
          ],
        })),

      removePersonalWord: (idToRemove) =>
        set((s) => ({ personalWords: s.personalWords.filter((w) => w.id !== idToRemove) })),

      markPlacementDone: () => set({ placementDone: true }),

      getSrs: (itemId) => get().srsStates[itemId],

      getDueItems: (kind) => {
        const all = Object.values(get().srsStates);
        return all.filter((s) => !s.mastered && isDue(s) && (!kind || s.kind === kind));
      },

      getMasteredItems: (kind) => {
        const all = Object.values(get().srsStates);
        return all.filter((s) => s.mastered && (!kind || s.kind === kind));
      },

      xpLevel: () => Math.floor(get().xp / XP_PER_LEVEL) + 1,
      xpProgressInLevel: () => get().xp % XP_PER_LEVEL,
    }),
    { name: 'russian-app-progress' },
  ),
);

export const MASTERY_GOAL = MASTERY_THRESHOLD;
export const HEARTS_MAX = MAX_HEARTS;
