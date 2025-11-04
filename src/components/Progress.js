import { useQuiz } from "../context/QuizContext";

function Progress() {
  const { index, numQuestion, points, totalPoints, answer } = useQuiz();
  return (
    <div>
      <header className='progress'>
        <progress max={numQuestion} value={index + Number(answer !== null)} />
        <p>
          Question <strong>{index}</strong> / {numQuestion}
        </p>
        <p>
          Points <strong>{points}</strong> / {totalPoints}
        </p>
      </header>
    </div>
  );
}

export default Progress;
