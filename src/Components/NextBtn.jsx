import { type } from "@testing-library/user-event/dist/type";

const NextBtn = ({dispatch,answer}) => {
    if (answer==null) return null;

    return ( 
        <button 
        className="btn btn-ui"
        onClick={()=>dispatch({type:"nextques"})}
        >
           Next
        </button>
     );
}
 
export default NextBtn;