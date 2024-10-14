export default function QuizReviewQuestionCard({ question, answer, userAnswer }) {

    const getAnswerClassName = () => {
        return `quiz-review-user-answer ${answer === userAnswer ? 'correct' : 'incorrect'}`;
    };
    return (
        <div className="quiz-review-question-card" style={{marginBottom:'30px'}}>
            <div className="question">{question}</div>
            <div style={{paddingLeft:'10px', borderLeft:`4px solid ${answer === userAnswer ? '#57CD75': '#DC5C5C'}`, marginTop:'5px'}}>
                <p className="quiz-review-system-answer">Answer: {answer}</p>
                <p className={getAnswerClassName()}>Your Answer: {userAnswer ? userAnswer: "N/A"}</p>
            </div>
                
        </div>
    )
}