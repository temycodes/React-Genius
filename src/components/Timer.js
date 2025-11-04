import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  const mins = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "clock" }), 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className='timer'>
      <p>
        {mins < 10 && "0"}
        {mins}:{seconds}
      </p>
    </div>
  );
}

export default Timer;
