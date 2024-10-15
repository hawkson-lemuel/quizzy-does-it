import "../quizCategoriesPage.css";
import { QUIZ_CATEGORIES } from '../utils/routes';
import Header from './Header';
import '../quizHistoryPage.css';
import { useQuizSettingsStore } from '../store/quizSettingsStore';

export default function QuizHistoryPage() {
    const { quizHistory } = useQuizSettingsStore();

return (
    <>
        <Header button={{text:'Back Home',route:QUIZ_CATEGORIES }}/>
        <div className="content-wrapper">
        <h2 className="page-title">Past Quizzes</h2>
        {
            quizHistory.length === 0 ? <div className="no-history">No quiz history available</div> : (
                <div className="quiz-grid">
                    {
                        //using slice to make a shallow copy of the array and reverse to show the most recent quiz first
                        quizHistory.slice().reverse().map((historyItem, index) => (
                            <div 
                                key={historyItem.category + index} 
                                className="quiz-card-wrapper" >
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{width:'70px'}}>
                                        <span style={{fontSize:'30px'}}>{historyItem.score}</span>
                                        <span style={{color:"#C6C6C6", position:'relative', left:'3px', top:'-1px'}}>/{historyItem.totalQuestions}</span>
                                    </span>
                                    <span className="history-category">{historyItem.category}</span>
                                </div>
                                <div style={{ textAlign: 'right', color:'#969696' }}>{historyItem.date}</div>
                            </div>

                        ))
                    }
                </div>
            )
        }
        </div>
    </>
)
}