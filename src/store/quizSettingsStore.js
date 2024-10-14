import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TIME_IN_SECONDS } from '../utils/constants';


export const useQuizSettingsStore = create(
  persist(
    (set, get) => ({
      numberOfQuestions: 1,
      difficulty: 'easy',
      isTimedQuiz: false,
      activeQuestions: [],
      answers:[],
      currentQuestionIndex: 0,
      category: null,
      timeStarted: TIME_IN_SECONDS,
      quizHistory: [],
      setTimeStarted: (timeStarted) => set({ timeStarted }),
      setAnswers: (questionIndex, answer) => {
        const currentAnswers = get().answers;
        const newAnswers = [...currentAnswers];
        newAnswers[questionIndex] = answer;
        set({ answers: newAnswers });
      },
      getCorrectAnswerCount: () => {
        const { answers, activeQuestions } = get();
        return answers.reduce((acc, answer, index) => {
          if (answer === activeQuestions[index].correct_answer) {
            return acc + 1;
          }
          return acc;
        }, 0);
      },
      resetQuiz:() =>{
        set({
          answers: [],
          currentQuestionIndex: 0,
          timeStarted: Math.floor(Date.now() / 1000),
        })
      },
      resetAnswers: () => set({ answers: [] }),
      setCategory: (category) => set({ category }),
      setCurrentQuestionIndex: (currentQuestionIndex) => set({ currentQuestionIndex }),
      setActiveQuestions: (activeQuestions) => set({ activeQuestions }),
      setNumberOfQuestions: (numberOfQuestions) => set({ numberOfQuestions }),
      setDifficulty: (difficulty) => set({ difficulty }),
      setIsTimedQuiz: (isTimedQuiz) => set({ isTimedQuiz }),
      updateQuizHistory: (history) => set((state) => {
        // Keep only the last 30 quiz history items
          const currentHistory = state.quizHistory;
          if (currentHistory.length >= 30) {
              currentHistory.shift(); // Remove the oldest item
          }
          return { quizHistory: [...currentHistory, history] };
      }),
    }),
    {
      name: 'quiz-settings-storage', // Key name in storage (local storage by default)
      getStorage: () => localStorage, // Use localStorage for persistence
    }
  )
);
