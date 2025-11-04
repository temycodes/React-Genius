import { useQuiz } from "../context/QuizContext";

function Options({ question }) {
  const { dispatch, answer } = useQuiz();
  const answered = answer !== null;
  return (
    <div>
      <div className='options'>
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              answered ? (index === question.correctOption ? "correct" : "wrong") : ""
            } `}
            key={option}
            disabled={answered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Options;
