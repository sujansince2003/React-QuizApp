const Progress = ({index,questions,points,maxPoints,answer}) => {
    return ( 
        <header className="progress">
            <progress max={questions.length} value={index + Number(answer!==null)} />
            <p>
                Questions {index+1}/{questions.length}
            </p>
            <p>{points}/{maxPoints}</p>
        </header>
     );
}
 
export default Progress;