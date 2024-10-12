import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import QuizCategoriesPage from './components/QuizCategoriesPage'
import QuizSettingsPage from './components/QuizSettingsPage';
import QuizHistoryPage from './components/QuizHistoryPage';
import QuestionPage from './components/QuestionPage';
import ResultsPage from './components/ResultsPage';
import {QUESTION, QUIZ_CATEGORIES, QUIZ_HISTORY, QUIZ_RESULTS, QUIZ_SETTINGS} from './utils/routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path={QUIZ_CATEGORIES} element={<QuizCategoriesPage />} />
          <Route path={QUIZ_SETTINGS} element={<QuizSettingsPage />} />
          <Route path={QUIZ_HISTORY} element={<QuizHistoryPage />} />
          <Route path={QUESTION} element={<QuestionPage />} />
          <Route path={QUIZ_RESULTS} element={<ResultsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
