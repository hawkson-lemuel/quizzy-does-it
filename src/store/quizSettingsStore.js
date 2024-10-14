import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TIME_IN_SECONDS } from '../utils/constants';

const questions = [{"type":"multiple","difficulty":"easy","category":"General Knowledge","question":"What was the name of the WWF professional wrestling tag team made up of the wrestlers Ax and Smash?","correct_answer":"Demolition","incorrect_answers":["The Dream Team","The Bushwhackers","The British Bulldogs"]},{"type":"multiple","difficulty":"easy","category":"General Knowledge","question":"In DC comics where does the Green Arrow (Oliver Queen) live?","correct_answer":"Star City","incorrect_answers":["Central City","Gotham City","Metropolis"]},{"type":"boolean","difficulty":"easy","category":"General Knowledge","question":"Jingle Bells was originally meant for Thanksgiving","correct_answer":"True","incorrect_answers":["False"]},{"type":"multiple","difficulty":"easy","category":"General Knowledge","question":"What is the largest organ of the human body?","correct_answer":"Skin","incorrect_answers":["Heart","large Intestine","Liver"]},{"type":"boolean","difficulty":"easy","category":"General Knowledge","question":"Ping-Pong originated in England","correct_answer":"True","incorrect_answers":["False"]}]

export const useQuizSettingsStore = create(
  persist(
    (set, get) => ({
      numberOfQuestions: 1,
      difficulty: 'easy',
      isTimedQuiz: false,
      activeQuestions: questions,
      answers:[],
      currentQuestionIndex: 0,
      category: null,
      timeStarted: TIME_IN_SECONDS,
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
      resetAnswers: () => set({ answers: [] }),
      setCategory: (category) => set({ category }),
      setCurrentQuestionIndex: (currentQuestionIndex) => set({ currentQuestionIndex }),
      setActiveQuestions: (activeQuestions) => set({ activeQuestions }),
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
