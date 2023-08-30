const Progress = ({index,questions,points}) => {
    return ( 
        <header className="progress">
            <p>
                Questions {index+1}/{questions.length}
            </p>
            <p>{points}</p>
        </header>
     );
}
 
export default Progress;