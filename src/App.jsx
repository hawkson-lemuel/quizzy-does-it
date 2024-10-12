import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import QuizCategoriesPage from './components/QuizCategoriesPage'
import {QUIZ_CATEGORIES} from './utils/routes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path={QUIZ_CATEGORIES} element={<QuizCategoriesPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
