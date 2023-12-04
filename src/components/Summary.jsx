import logo from '../assets/quiz-complete.png';

export default function Summary({ userAnswers }) {
    return (
        <div id="summary">
            <img src={logo} alt='quiz complete' />
            <h2>Quiz Completed!</h2>
            <div id="summary-stats">
                <p>
                    <span className="number">1%</span>
                    <span className="skipped">skipped</span>
                </p>
                <p>
                    <span className="number">10%</span>
                    <span className="skipped">skipped</span>
                </p>
                <p>
                    <span className="number">20%</span>
                    <span className="skipped">skipped</span>
                </p>
            </div>
            <ol>
                <li>
                    <h3>2</h3>
                    <p className='question'>question text</p>
                    <p className='user-answer'>answer</p>
                </li>
            </ol>
        </div>
    )  
}