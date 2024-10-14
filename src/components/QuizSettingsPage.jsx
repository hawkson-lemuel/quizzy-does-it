import React, { useState, useEffect } from 'react';
import DifficultySelector from "./DifficultySelector";
import TimedQuizCheckbox from "./TimedQuizCheckbox";
import '../quizSettingsPage.css'; 
import { useNavigate } from "react-router-dom";
import { QUESTION, QUIZ_CATEGORIES } from "../utils/routes";
import { useQuizSettingsStore } from "../store/quizSettingsStore";
import Header from "./Header";
import Loader from './Loader';
import Warning from './Warning';

const fetchCategoryQuestionCount = async (categoryId) => {
    try{
        const response = await fetch(`https://opentdb.com/api_count.php?category=${categoryId}`);
        const data = await response.json();
        return data.category_question_count;
    }catch(error){
        return false;
    }
}

const initiateQuestionCount = {
    total_easy_question_count: 0,
    total_medium_question_count: 0,
    total_hard_question_count: 0
}

export default function QuizSettingsPage() {
    const [errors, setErrors] = useState([]);
    const [categoryQuestionCount, setCategoryQuestionCount] = useState(initiateQuestionCount);
    const [maxQuestions, setMaxQuestions] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [isFailed, setIsFailed] = useState(false);
    const navigate = useNavigate();

    const {numberOfQuestions, resetAnswers, difficulty, setTimeStarted, setCurrentQuestionIndex, category, isTimedQuiz, setNumberOfQuestions,  setDifficulty,  setIsTimedQuiz} = useQuizSettingsStore();

    useEffect(() => {
        setIsFailed(false);
        fetchCategoryQuestionCount(category.id)
            .then((count) => {
                if(!count)
                    throw new Error('Failed to fetch categories');

                setCategoryQuestionCount(count);
            })
            .catch(() => {
                setIsFailed(true);
                setErrors(["Failed to fetch question count. Refresh page to try again."]);
                setCategoryQuestionCount(initiateQuestionCount)
            }).finally(() => setIsLoading(false))
    }, []);


    useEffect(() => {
        switch (difficulty) {
            case 'easy':
                setMaxQuestions(categoryQuestionCount.total_easy_question_count);
                break;
            case 'medium':
                setMaxQuestions(categoryQuestionCount.total_medium_question_count);
                break;
            case 'hard':
                setMaxQuestions(categoryQuestionCount.total_hard_question_count);
                break;
            default:
                setMaxQuestions(0);
        }
    }, [categoryQuestionCount, difficulty]);

    const handleNumberOfQuestionsChange = (event) => {
        const value = event.target.value;
        setNumberOfQuestions(value === '' ? '' : parseInt(value, 10));
    }

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    }

    const handleTimedQuizChange = (event) => {
        setIsTimedQuiz(event.target.checked);
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const validateInputs = () => {
        const newErrors = [];
        if (numberOfQuestions === '' || numberOfQuestions <= 0) {
            newErrors.push("Number of questions must be greater than 0");
        }
        if (numberOfQuestions > maxQuestions) {
            newErrors.push(`${capitalizeFirstLetter(difficulty)} difficulty has only ${maxQuestions} questions. Choose a lower number of questions`);
        }
        const allowedValues = ['easy', 'medium', 'hard'];
        if (!allowedValues.includes(difficulty)) {
            newErrors.push("Invalid difficulty level");
        }
        setErrors(newErrors);
        return newErrors.length === 0;
    }

    useEffect(() => {
        console.log(numberOfQuestions, difficulty, isTimedQuiz);
        validateInputs();
    }, [numberOfQuestions, difficulty, isTimedQuiz, maxQuestions]);

    const resetQuizStateInStore = () => {
        //TODO reset questions to 0
        // setActiveQuestions([]);
        resetAnswers();
        setCurrentQuestionIndex(0);
        //TODO move this into the question fetch page function
        setTimeStarted(Math.floor(Date.now() / 1000));
    }

    const handleStartQuiz = () => {
        if (validateInputs()) {
            //navigate to question page
            console.log('Start Quiz');
            resetQuizStateInStore()
            navigate(QUESTION)
        }
    }

    return (
        <>
            <Header button={{text:'Back Home', route:QUIZ_CATEGORIES}}/>
            <div className="content-wrapper">
                <h2 className="page-title">Options</h2>
                    {
                        isLoading ? (<Loader message="Loading..." />) : isFailed ? (<Warning message="Failed to fetch question counts. Please refresh to try again"/>) : (
                            <>
                                <div className="quiz-settings-grid">
                                    <label className="quiz-settings-label">Category</label>
                                    <p className="quiz-settings-category-name">{category.name}</p>

                                    <label className="quiz-settings-label">Number of Questions</label>
                                    <input 
                                        type="number" 
                                        className="fancy-container" 
                                        min={1} 
                                        max={categoryQuestionCount} 
                                        value={numberOfQuestions} 
                                        onChange={handleNumberOfQuestionsChange} 
                                        style={{width:'40px', textAlign:'center', padding:'8px 15px'}} 
                                    />
                                    
                                    <label className="quiz-settings-label">Difficulty</label>
                                    <DifficultySelector value={difficulty} onChange={handleDifficultyChange} />
                                    
                                    <label className="quiz-settings-label">Timed Quiz</label>
                                    <TimedQuizCheckbox checked={isTimedQuiz} onChange={handleTimedQuizChange} />
                                    
                                </div>
                                    <button className="regular-button" style={{marginTop:'50px'}} disabled={errors.length > 0} onClick={handleStartQuiz}>Start Quiz!</button>
                                {errors.length > 0 && (
                                    <div className="quiz-settings-error">
                                        {errors.map((error, index) => (
                                            <p key={index}>{error}</p>
                                        ))}
                                    </div>
                                )}
                            </>
                        )
                    }

            </div>
        </>
    )
}