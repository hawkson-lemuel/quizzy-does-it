import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import QuizCategoriesPage from './components/QuizCategoriesPage'
import {QUESTION, QUIZ_CATEGORIES, QUIZ_HISTORY, QUIZ_SETTINGS} from './utils/routes'
import QuizHistoryPage from './components/QuizHistoryPage';
import QuizSettingsPage from './components/QuizSettingsPage';
import QuestionPage from './components/QuestionPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path={QUIZ_CATEGORIES} element={<QuizCategoriesPage />} />
          <Route path={QUIZ_HISTORY} element={<QuizHistoryPage />} />
          <Route path={QUIZ_SETTINGS} element={<QuizSettingsPage />} />
          <Route path={QUESTION} element={<QuestionPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
