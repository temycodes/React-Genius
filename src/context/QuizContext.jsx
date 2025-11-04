import { createContext, useContext, useMemo } from "react";
import { useEffect, useReducer } from "react";

const QuizContext = createContext();

const SECS_PER_QUESTION = 15;

const initialState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished',
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "begin":
      return { ...state, status: "active", secondsRemaining: state.questions.length * SECS_PER_QUESTION };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption ? state.points + question.points : state.points,
      };

    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore: state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return { ...state, points: 0, index: 0, answer: null, status: "ready" };

    case "clock":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("unknown");
  }
}

function QuizProvider({ children }) {
  const [{ questions, status, index, answer, points, highscore, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numQuestion = useMemo(() => questions.length, [questions]);

  const totalPoints = useMemo(() => questions.reduce((prev, cur) => prev + cur.points, 0), [questions]);

  useEffect(() => {
    fetch("https://react-quiz.free.beeceptor.com/questions")
      .then((res) => res.json())
      .then((data) => {
        const formattedData = Array.isArray(data) ? data[0] : data;
        dispatch({ type: "dataReceived", payload: formattedData.questions });
      })
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  const contextValue = useMemo(
    () => ({
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining,
      numQuestion,
      totalPoints,
      dispatch,
    }),
    [questions, status, index, answer, points, highscore, secondsRemaining, numQuestion, totalPoints]
  );

  return <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>;
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) throw new Error("context used in wrong provider");

  return context;
}

export { QuizProvider, useQuiz };
