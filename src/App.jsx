import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import QuizCategoriesPage from './components/QuizCategoriesPage'
import {QUIZ_CATEGORIES, QUIZ_HISTORY, QUIZ_SETTINGS} from './utils/routes'
import QuizHistoryPage from './components/QuizHistoryPage';
import QuizSettingsPage from './components/QuizSettingsPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path={QUIZ_CATEGORIES} element={<QuizCategoriesPage />} />
          <Route path={QUIZ_HISTORY} element={<QuizHistoryPage />} />
          <Route path={QUIZ_SETTINGS} element={<QuizSettingsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
