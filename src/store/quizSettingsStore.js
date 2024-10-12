import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useQuizSettingsStore = create(
  persist(
    (set) => ({
      numberOfQuestions: 1,
      difficulty: 'easy',
      isTimedQuiz: false,
      category: null,
      setCategory: (category) => set({ category }),
      setNumberOfQuestions: (numberOfQuestions) => set({ numberOfQuestions }),
      setDifficulty: (difficulty) => set({ difficulty }),
      setIsTimedQuiz: (isTimedQuiz) => set({ isTimedQuiz }),
    }),
    {
      name: 'quiz-settings-storage', // Key name in storage (local storage by default)
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);
