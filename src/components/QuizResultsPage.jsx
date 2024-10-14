import searchIcon from '../assets/search.png';
import trophyImg from '../assets/trophy.png';
import confettiImg from '../assets/confetti.png';
import "../quizCategoriesPage.css";
import { useEffect, useState } from 'react';
import { useQuizSettingsStore } from '../store/quizSettingsStore';
import Header from './Header';
import { QUIZ_REVIEW, QUESTION, QUIZ_CATEGORIES } from '../utils/routes';
import { useNavigate, Link } from 'react-router-dom';

export default function QuizResultsPage() {

    const { getCorrectAnswerCount, numberOfQuestions, resetQuiz} = useQuizSettingsStore();
    const navigate = useNavigate();

    const handleRetakeQuiz = () => {
        resetQuiz();
        navigate(QUESTION)
    }

    const renderQuizPerformanceHeadline = () => {
        const correctAnswerCount = getCorrectAnswerCount();
        const percentage = (correctAnswerCount / numberOfQuestions) * 100;

        if(percentage === 100){
            return "Perfect Score!";
        }else if(percentage >= 80){
            return "Great Job!";
        }else if(percentage >= 50){
            return "Good Job!";
        }else{
            return "Keep Practicing!";
        }
    }

    return (
        <>
            <Header button={{text:"Back Home", route:QUIZ_CATEGORIES}}/>
            <div className="content-wrapper">
                    <h2 style={{fontSize:'30px', color:'#FE88A6'}}>{renderQuizPerformanceHeadline()}</h2>
                    <span style={{marginBottom:'50px', display:'flex',flexDirection:'column',backgroundImage:`url(${confettiImg})`, backgroundSize:'contain', alignItems:'center', backgroundPosition:'center', backgroundRepeat:'no-repeat', width:'100%'}}>
                        <img src={trophyImg} style={{width:'140px'}} />
                        <span style={{fontWeight:"bold", }}>
                            <span style={{color:'#FE88A6', fontSize:'32px'}}>{getCorrectAnswerCount()}</span><span style={{color:'#C6B6B9', fontSize:'20px', position:'relative', top:'-3px'}}>/{numberOfQuestions}</span>
                        </span>

                    </span>
                    <div>
                        <Link to={QUIZ_REVIEW}>
                            <button className="regular-button" style={{width:'155px', marginRight:'10px'}}>Check Answers</button>
                        </Link>
                        <button className="regular-button" style={{backgroundColor:'#57CD75', marginRight:'10px'}} onClick={handleRetakeQuiz}>Retake Quiz!</button>
                    </div>
                    <Link to={QUIZ_CATEGORIES} style={{textDecoration:'none', color:'#FE88A6', fontSize:'16px', marginTop:'20px'}}>Choose Another Topic</Link>

            </div>
        </>
    )
}