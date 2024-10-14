import "../quizCategoriesPage.css";
import { QUIZ_CATEGORIES } from '../utils/routes';
import Header from './Header';
import '../quizHistoryPage.css';
import { useQuizSettingsStore } from '../store/quizSettingsStore';

export default function QuizHistoryPage() {
    const { quizHistory } = useQuizSettingsStore();
    const history = [
        {
            category: 'History',
            score: 5,
            num_of_questions: 10,
            date: '2021-09-01'
        },
        {
            category: 'Current Affairs',
            score: 15,
            num_of_questions: 25,
            date: '2021-09-01'
        },
        {
            category: 'Entertainment',
            score: 20,
            num_of_questions: 30,
            date: '2021-09-01'
        },
        {
            category: 'History',
            score: 5,
            num_of_questions: 10,
            date: '2021-09-01'
        },
        {
            category: 'Current Affairs',
            score: 15,
            num_of_questions: 25,
            date: '2021-09-01'
        },
        {
            category: 'Entertainment',
            score: 20,
            num_of_questions: 30,
            date: '2021-09-01'
        },
        {
            category: 'History',
            score: 5,
            num_of_questions: 10,
            date: '2021-09-01'
        },
        {
            category: 'Current Affairs',
            score: 15,
            num_of_questions: 25,
            date: '2021-09-01'
        },
        {
            category: 'Entertainment',
            score: 20,
            num_of_questions: 30,
            date: '2021-09-01'
        },
    ]

return (
    <>
        <Header button={{text:'Back Home',route:QUIZ_CATEGORIES }}/>
        <div className="content-wrapper">
        <h2 className="page-title">History</h2>
        {
            quizHistory.length === 0 ? <div className="no-history">No quiz history available</div> : (
                <div className="quiz-grid">
                    {
                        quizHistory.map((historyItem, index) => (
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