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

const initialstate = {
  questions: [],

  //loading error ready active finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 20,
};

function render(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "Error" };

    case "startQuiz":
      return { ...state, status: "active" };

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
    default:
      console.log("hello");
  }
}

function App() {
  const [state, dispatch] = useReducer(render, initialstate);
  const { questions, status, index, answer, points, highscore } = state;
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
            <NextBtn
              dispatch={dispatch}
              answer={answer}
              questions={questions}
              index={index}
            />
          </>
        )}
        {status === "finished" && (
          <Finished
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
