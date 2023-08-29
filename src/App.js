import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";

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

    default:
      console.log("hello");
  }
}

function App() {
  const [state, dispatch] = useReducer(render, initialstate);

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
        <p>1/15</p>
        <p>Questions</p>
      </Main>
    </div>
  );
}

export default App;
