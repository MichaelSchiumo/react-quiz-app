import { useRef } from "react";

export default function Answers({ answers, selectedAnswer, answeredState, onSelect }) {
    const shuffledAnswers = useRef();

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5);
    }
    return (
        <ul id="answers">
        {shuffledAnswers.current.map(answer => {
            let cssClass = '';
            const isSelected = selectedAnswer === answer;

            if (answeredState === 'answered' && isSelected) {
                cssClass = 'selected';
            }

            if ((answeredState === 'correct' || answeredState === 'wrong') && isSelected) {
                cssClass = answeredState;
            }

            return (
                <li key={answer} className="answer">
                    <button onClick={() => onSelect(answer)} className={cssClass}>{answer}</button>
                </li>
            )}
        )}
    </ul>
    )
}