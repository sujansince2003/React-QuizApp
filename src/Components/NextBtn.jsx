

const NextBtn = ({dispatch,answer,questions,index}) => {
    if (answer==null) return null;

    if(index< (questions.length)-1)
    return ( 
        <button 
        className="btn btn-ui"
        onClick={()=>dispatch({type:"nextques"})}
        >
           Next
        </button>
     );

    if(index=== (questions.length)-1)
    return ( 
        <button 
        className="btn btn-ui"
        onClick={()=>dispatch({type:"finished"})}
        >
           Finish
        </button>
     );
}
 
export default NextBtn;