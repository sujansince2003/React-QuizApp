import { useEffect, useReducer, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import QuestionComp from "./QuestionComp";

const initialstate = {
  questions: [],

  //loading error ready active finished
  status: "loading",
};

function render(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "Error" };

    case "startQuiz":
      return { ...state, status: "active" };

    default:
      console.log("hello");
  }
}

function App() {
  const [state, dispatch] = useReducer(render, initialstate);
  const { questions, status } = state;
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

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "ready" && (
          <StartScreen questions={questions} dispatch={dispatch} />
        )}
        {status === "active" && <QuestionComp />}
      </Main>
    </div>
  );
}

export default App;
