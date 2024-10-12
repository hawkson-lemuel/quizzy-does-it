import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useQuizSettingsStore = create(
  persist(
    (set) => ({
      category: null,
      setCategory: (category) => set({ category }),
    }),
    {
      name: 'quiz-settings-storage', // Key name in storage (local storage by default)
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);
