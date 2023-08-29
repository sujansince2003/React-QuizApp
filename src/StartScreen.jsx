const StartScreen = ({questions,dispatch}) => {
    return (
        <div className="start">
            <h2>Welcome To React Quiz🔥🚀</h2>
            <h3> {questions.length}  Question available</h3>
            <button className="btn btn-ui" onClick={()=>dispatch({type:"startQuiz"})}>Lets Start</button>
        </div>
      );
}
 
export default StartScreen;