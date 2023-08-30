import { useEffect } from "react";

const Timer = ({dispatch,Seconds}) => {
    const min=Math.floor(Seconds/60);
    const sec=Seconds%60;



    useEffect(function()
    {
       const id= setInterval(function(){
         dispatch({type:"tick"})
        },1000)

return ()=> clearInterval(id)

    },[dispatch])
    return ( 
    <div className="timer">
        ⏳  {min<10 && "0"}
        {min}:{sec<10 && "0"}{sec}
    </div> 
    );
}
 
export default Timer;