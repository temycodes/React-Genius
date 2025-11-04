import { useQuiz } from "../context/QuizContext";

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz();
  return (
    <div className='start'>
      <h2>Welcome to React Genius</h2>
      <h3>{numQuestions} Questions To Test Your Brain</h3>
      <button className='btn btn-ui' onClick={() => dispatch({ type: "begin" })}>
        Begin!
      </button>
    </div>
  );
}

export default StartScreen;
