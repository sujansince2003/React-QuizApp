const Finished = ({points,maxPoints,highscore,dispatch}) => {
    return ( 
        <>
        <p className="result">You Scored {points} out of {maxPoints}</p>
        <p className="highscore">HighScore {highscore}</p>
         <button className="btn btn-ui"
         onClick={()=>dispatch({type:"restart"})}
         >Restart</button>
        </>
     );
}
 
export default Finished;