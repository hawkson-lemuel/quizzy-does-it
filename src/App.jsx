import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import QuizCategoriesPage from './components/QuizCategoriesPage'
import {QUESTION, QUIZ_CATEGORIES, QUIZ_HISTORY, QUIZ_RESULTS, QUIZ_SETTINGS, QUIZ_REVIEW} from './utils/routes'
import QuizHistoryPage from './components/QuizHistoryPage';
import QuizSettingsPage from './components/QuizSettingsPage';
import QuestionPage from './components/QuestionPage';
import QuizResultsPage from './components/QuizResultsPage';
import QuizReviewPage from './components/QuizReviewPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path={QUIZ_CATEGORIES} element={<QuizCategoriesPage />} />
          <Route path={QUIZ_HISTORY} element={<QuizHistoryPage />} />
          <Route path={QUIZ_SETTINGS} element={<QuizSettingsPage />} />
          <Route path={QUESTION} element={<QuestionPage />} />
          <Route path={QUIZ_RESULTS} element={<QuizResultsPage />} />
          <Route path={QUIZ_REVIEW} element={<QuizReviewPage />} />
          <Route path="*" element={<Navigate to={QUIZ_CATEGORIES} />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
