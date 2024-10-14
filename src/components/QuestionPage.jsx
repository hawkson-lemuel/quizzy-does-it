import "../questionPage.css";
import { useEffect, useState } from 'react';
import { QUIZ_CATEGORIES, QUIZ_RESULTS, QUIZ_SETTINGS } from "../utils/routes";
import { useQuizSettingsStore } from "../store/quizSettingsStore";
import { useNavigate,Link } from 'react-router-dom';
import Header from "./Header";
import { TIME_IN_SECONDS } from "../utils/constants";
import correctImg from '../assets/correct_answer.png';
import clockImg from '../assets/clock-outline.png';

export default function QuestionPage() {
    const [shuffledAnswers, setShuffledAnswers] = useState([]); //store the shuffled answers
    const [timeRemaining, setTimeRemaining] = useState(TIME_IN_SECONDS);

    const { activeQuestions: questions, timeStarted, setTimeStarted, updateQuizHistory, getCorrectAnswerCount, setActiveQuestions, currentQuestionIndex, setCurrentQuestionIndex, category, difficulty, numberOfQuestions, answers, setAnswers, isTimedQuiz } = useQuizSettingsStore();

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
        if (questions.length > 0) {
            const currentQuestionData = questions[currentQuestionIndex];
            //merge the correct answer and the other answer options and shuffle them
            const answers = [...currentQuestionData.incorrect_answers, currentQuestionData.correct_answer];
            setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
        }
    }, [currentQuestionIndex, questions]);


    const navigateToNext = () => {
        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            //update quiz history
            updateQuizHistory({
                category: category.name,
                score: getCorrectAnswerCount(),
                totalQuestions: numberOfQuestions,
                  date: new Date().toLocaleDateString('en-CA') // Format: YYYY-MM-DD
            })
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

    //this function returns the class to be applied to the answer option based on if it is correct or incorrect
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

    //this function updates the number of seconds remaining to answer a question
    const updateTimeRemaining = () => {
        // Calculate the time elapsed since the quiz started.
        //takes the current millisecond time and divides it by 1000 to get the number of seconds
        //then it subtracts the time the quiz started to get the time elapsed(in seconds)
        const timeElapsed = Math.floor(Date.now() / 1000) - timeStarted;
    
        // Calculate the remaining time by subtracting the elapsed time from the total allowed time
        const remainingTime = Math.floor(TIME_IN_SECONDS - timeElapsed);
    
        // If the remaining time is less than or equal to 1 second, set the remaining time to 1 second
        //this is done because the time remaining should not display less than 1 second. time becomes less than 1 second if it takes more than a second to redirect to the next question
        if (remainingTime <= 1) {
            setTimeRemaining(1);
        } else {
            // Otherwise, set the remaining time to the calculated remaining time
            setTimeRemaining(remainingTime);
        }
    }

    if (questions.length === 0) {
        return <div style={{display:'flex',flexDirection:'column', alignItems:'center', fontSize:'20px'}}>
            <p>No questions found</p>
            <Link to={QUIZ_CATEGORIES}>
                <p style={{color:'#FE88A6'}}>Go Home</p>
            </Link>
        </div>;
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