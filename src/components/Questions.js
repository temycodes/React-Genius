import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

function Questions() {
  const { questions, index } = useQuiz();
  const question = questions[index];

  return (
    <div>
      <h2>{question.question}</h2>
      <Options question={question} />
    </div>
  );
}

export default Questions;
