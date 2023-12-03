import { useState, useCallback } from "react";
import QUESTIONS from '../questions.js';
import logo from '../assets/quiz-complete.png';
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [answeredState, setAnsweredState] = useState('');

    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = answeredState === '' ? userAnswers.length : userAnswers.length - 1;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setAnsweredState('answered');
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer];
        });

        setTimeout(() => {
            if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
                setAnsweredState('correct');
            } else {
                setAnsweredState('wrong');
            }

            setTimeout(() => {
                setAnsweredState('');
            }, 2000);
        }, 1000);
    }, [activeQuestionIndex]);

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return <div id="summary">
            <img src={logo} alt='quiz complete' />
            <h2>Quiz Completed!</h2>
        </div>
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer timeout={10000} onTimeout={handleSkipAnswer} key={activeQuestionIndex} />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map(answer => {
                        let cssClass = '';
                        const isSelected = userAnswers[userAnswers.length - 1] === answer;

                        if (answeredState === 'answered' && isSelected) {
                            cssClass = 'selected';
                        }

                        if ((answeredState === 'correct' || answeredState === 'wrong') && isSelected) {
                            cssClass = answeredState;
                        }
                        
                        return (
                            <li key={answer} className="answer">
                                <button onClick={() =>handleSelectAnswer(answer)} className={cssClass}>{answer}</button>
                            </li>
                        )}
                    )}
                </ul>
            </div>
        </div>
    )
}