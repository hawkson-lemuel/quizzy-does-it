import "../questionPage.css";
import { useEffect, useState } from 'react';
import { QUIZ_RESULTS } from "../utils/routes";
import { useQuizSettingsStore } from "../store/quizSettingsStore";
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import { TIME_IN_SECONDS } from "../utils/constants";
import Loader from "./Loader";
import correctImg from '../assets/correct_answer.png';
import clockImg from '../assets/clock-outline.png';

const fetchQuestions = async (category, difficulty, numberOfQuestions) => {
    try{
        const response = await fetch(`https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`);
        const data = await response.json();
        return data.results;
    }catch(error){
        return false;
    }
}

export default function QuestionPage() {
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [isFailed, setIsFailed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [timeRemaining, setTimeRemaining] = useState(TIME_IN_SECONDS);

    const { activeQuestions: questions, timeStarted, setTimeStarted, getCorrectAnswerCount, setActiveQuestions, currentQuestionIndex, setCurrentQuestionIndex, category, difficulty, numberOfQuestions, answers, setAnswers, isTimedQuiz } = useQuizSettingsStore();

    const navigate = useNavigate();
    const calculateProgressbarPercentage = () => {
        if (answers[currentQuestionIndex] === undefined || answers[currentQuestionIndex]  === null) {
            return ((currentQuestionIndex) / questions.length) * 100;
        } else {
            return ((currentQuestionIndex + 1) / questions.length) * 100;
        }
    }

    const forceNavigateToNext = () => {
        setAnswers(currentQuestionIndex, null); // Optionally mark the current question as unanswered
        navigateToNext(); // Move to the next question
        setTimeStarted(Date.now() / 1000);
        setTimeRemaining(TIME_IN_SECONDS)
    }; 

    useEffect(() => {
        let intervalId;
        if (isTimedQuiz) {
            intervalId = setInterval(() => {
                console.log("interval function first thing", timeRemaining);
                if (timeRemaining <= 1) {
                    console.log("ah timeRemaining", timeRemaining);
                    forceNavigateToNext();
                }else{
                    console.log("timeRemaining", timeRemaining);
                    updateTimeRemaining()
                }

            }, 1000);
        }
    
        return () => clearInterval(intervalId);
    }, [isTimedQuiz, currentQuestionIndex, timeRemaining]);

    useEffect(() => {
        setIsFailed(false);

        // if (questions.length === 0) { // if there are no active questions, fetch them
        //     fetchQuestions(category.id, difficulty, numberOfQuestions).then((data) => {
        //         if(!data)
        //             throw new Error('Failed to fetch questions');

        //         setActiveQuestions(data);
        //     })
        //     .catch(() => setIsFailed(true))
        //     .finally(() => setIsLoading(false));

        // }
    }, [category.id, difficulty, numberOfQuestions, questions.length, setActiveQuestions]);

    useEffect(() => {
        if (questions.length > 0) {
            const currentQuestionData = questions[currentQuestionIndex];
            const answers = [...currentQuestionData.incorrect_answers, currentQuestionData.correct_answer];
            setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
        }
    }, [currentQuestionIndex, questions]);

    useEffect(() => {
        console.log('answers', currentQuestionIndex, answers);
    }, [answers]);

    const navigateToNext = () => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Quiz is completed
            // setActiveQuestions([]);
            // TODO handle navigation to results page
            navigate(QUIZ_RESULTS);
        }
    }

    const handleNextQuestionClick = () => {
        if (answers[currentQuestionIndex] === undefined || answers[currentQuestionIndex]  === null) {
            alert('Please select an answer');
            return;
        }
        navigateToNext();

        if(isTimedQuiz){
            setTimeStarted(Date.now() / 1000);
            setTimeRemaining(TIME_IN_SECONDS)
        }
    }

    const getClassForAnswer = (answer) => {
        let classes = [];

        if (answers[currentQuestionIndex]  !== null && answers[currentQuestionIndex] !== undefined && answer === questions[currentQuestionIndex].correct_answer) {
            classes.push('correct');
        }

        if (answers[currentQuestionIndex]  === answer && answer !== questions[currentQuestionIndex].correct_answer) {
            classes.push('incorrect');
        }

        return classes.join(' ');
    }

    const handleAnswerChange = (answer) => {
        if (answers[currentQuestionIndex] === null || answers[currentQuestionIndex] === undefined) {
            setAnswers(currentQuestionIndex, answer);
        }
    }

    const updateTimeRemaining = () => {
        const timeElapsed = Math.floor(Date.now() / 1000) - timeStarted;
        const remainingTime = Math.floor(TIME_IN_SECONDS - timeElapsed);

        if(remainingTime <= 1){
            setTimeRemaining(1);
        }else{
            setTimeRemaining(remainingTime);
        }
    }

    if (questions.length === 0) {
        return <Loader message="Loading questions..." />;
    }

    return (
        <>
            <Header button={{text:'Quit', route:QUIZ_RESULTS}} />
            <h2>{category.name}</h2>
            <div className="question-wrapper">
                <div className="question-progress-wrapper" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between', width:'100%', alignItems:'flex-end'}}>
                        <div className="question-progress-text-wrapper">
                            <span className="question-progress-text-1" >Question {currentQuestionIndex + 1}</span>
                            <span className="question-progress-text-2">/{questions.length}</span>
                        </div>
                        <div className="question-status" style={{display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
                            {
                                (getCorrectAnswerCount() > 0) && (
                                    <span className="quiz-status-wrapper" style={{color:'#57CD75'}}>
                                        <img src={correctImg} className="quiz-status-icon" /> {getCorrectAnswerCount()}
                                    </span>
                                )
                            }
                            {
                                isTimedQuiz && (
                                    <span className="quiz-status-wrapper" style={{color:'#FE88A6'}}>
                                        <img src={clockImg} className="quiz-status-icon" /> {timeRemaining}
                                    </span>
                                    // <span className="question-timer" >
                                    //     <span className="question-timer-text">
                                    //         {timeRemaining} 
                                    //     </span>
                                    // </span>
                                )
                            }
                        </div>
                    </div>
                    <div className="question-progress-bar-wrapper">
                        <div className="question-progress-bar" style={{ width: `${calculateProgressbarPercentage()}%` }}></div>
                    </div>
                </div>
                <div className="question-wrapper">
                    <p className="question-text" dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }}></p>
                    <div className="possible-answers">
                        {shuffledAnswers.map((answer, index) => (
                            <div className="answer-item" key={index}>
                                <input
                                    type="radio"
                                    id={`answer-${index}`}
                                    name="answer"
                                    value={answer}
                                    checked={answers[currentQuestionIndex] === answer}
                                    onChange={() => handleAnswerChange(answer)}
                                    disabled={answers[currentQuestionIndex] !== null && answers[currentQuestionIndex] !== undefined}
                                />
                                <label className={`fancy-container ${getClassForAnswer(answer)}`} htmlFor={`answer-${index}`} dangerouslySetInnerHTML={{ __html: answer }}></label>
                            </div>
                        ))}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '30px' }}>
                        <button disabled={answers[currentQuestionIndex] === undefined || answers[currentQuestionIndex] === null} className="regular-button next-button" style={{ marginTop: '10px' }} onClick={handleNextQuestionClick}>
                            {currentQuestionIndex + 1 < questions.length ? 'Next' : 'Finish!'}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}