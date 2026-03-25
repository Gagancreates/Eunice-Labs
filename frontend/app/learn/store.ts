import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProgressState {
  completedLessons: string[];
  markCompleted: (lessonId: string) => void;
  isUnlocked: (lessonId: string, index: number) => boolean;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      markCompleted: (lessonId) =>
        set((state) => ({
          completedLessons: state.completedLessons.includes(lessonId)
            ? state.completedLessons
            : [...state.completedLessons, lessonId],
        })),
      isUnlocked: (lessonId, index) => {
        if (index <= 2) return true;
        return get().completedLessons.length >= index - 2;
      },
    }),
    {
      name: 'dl-llm-progress',
    }
  )
);
