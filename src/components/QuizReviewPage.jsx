import { QUIZ_CATEGORIES, QUIZ_RESULTS } from "../utils/routes";
import { useQuizSettingsStore } from '../store/quizSettingsStore';
import Header from "./Header";
import QuizReviewQuestionCard from "./QuizReviewQuestionCard";
import "../quizReviewPage.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function QuizReviewPage() {
    const {activeQuestions: questions, answers, category, getCorrectAnswerCount, numberOfQuestions} = useQuizSettingsStore();

    useEffect(() => {
        console.log(questions);
    }, []);
    return (
        <>
            <Header button={{text:"Back To Results", route:QUIZ_RESULTS}} />
            <div className="content-wrapper">
            <h2 className="page-title" style={{marginBottom:'0px'}}>Quiz Review</h2>

            {
                questions.length === 0 ? (
                    <>
                        <div className="no-history">No quiz results available</div>
                        <Link to={QUIZ_CATEGORIES}>
                            <button className="main-header-button">Back to Home</button>
                        </Link>
                    </>
                ) :(
                    <>
                        <h2 style={{marginBottom:'40px'}}>{category.name} ({getCorrectAnswerCount()}/{numberOfQuestions})</h2>
                        <div>
                            {
                                questions.map((question, index) => {
                                    return (
                                        <QuizReviewQuestionCard 
                                            key={index}
                                            question={question.question}
                                            answer={question.correct_answer}
                                            userAnswer={answers[index]}
                                        />
                                    )
                                })
                            }
                        </div>
                    </>
                )
            }

            </div>
        </>
    )
}