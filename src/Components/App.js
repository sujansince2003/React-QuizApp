import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import QuestionComp from "./QuestionComp";
import NextBtn from "./NextBtn";
import Progress from "./Progress";
import Finished from "./Finished";
import Timer from "./Timer";

const Sec_per_ques = 10;
const initialstate = {
  questions: [],

  //loading error ready active finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 20,
  Seconds: null,
};

function render(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "Error" };

    case "startQuiz":
      return {
        ...state,
        status: "active",
        Seconds: state.questions.length * Sec_per_ques,
      };

    case "newAnswer":
      const question = state.questions.at(state.index);
      // console.log(question);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };

    case "nextques":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };

    case "restart":
      return { ...initialstate, questions: state.questions, status: "ready" };

    case "tick":
      return {
        ...state,
        Seconds: state.Seconds - 1,
        status: state.Seconds === 0 ? "finished" : state.status,
      };
    default:
      console.log("hello");
  }
}

function App() {
  const [state, dispatch] = useReducer(render, initialstate);
  const { questions, status, index, answer, points, highscore, Seconds } =
    state;
  useEffect(() => {
    async function fetchdata() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        // console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchdata();
  }, []);

  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <StartScreen questions={questions} dispatch={dispatch} />
        )}

        {status === "active" && (
          <>
            <Progress
              index={index}
              questions={questions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <QuestionComp
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer dispatch={dispatch} Seconds={Seconds} />
              <NextBtn
                dispatch={dispatch}
                answer={answer}
                questions={questions}
                index={index}
              />
            </footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
