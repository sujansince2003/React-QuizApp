const Progress = ({index,questions}) => {
    return ( 
        <header className="progress">
            <p>
                Questions {index+1}/{questions.length}
            </p>
        </header>
     );
}
 
export default Progress;