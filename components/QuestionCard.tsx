import { useState } from "react";
import { EStatus, useStateContext } from "../context/StateContext";

const QuestionCard: React.FC = () => {

  const { state: {questions, questionNum }, setState } = useStateContext();

  interface IQState { 
    answer: string, 
    answered: boolean, 
    answerCorrect: boolean
  }

   const currentQuestion = questions[questionNum - 1];

  const [QuestionState, setQuestionState] = useState<IQState>({ answer: '', answered: false, answerCorrect: false});

  // submit answer
  const submitAnswer = (answer: string): void => {
    // don't proceed if already answered
    if (QuestionState.answered) return;
    
    const answerCorrect = currentQuestion.correct_answer === answer;

     setQuestionState(state => ({...state, answer, answered: true, answerCorrect })); 
     
    const lastQuestion = questionNum === questions.length;
    
    setState(state => ({ ...state, score: answerCorrect ? state.score + 1: state.score, status: lastQuestion ? EStatus.FINISHED: state.status }));
  }

  // go to next question
  const nextQuestion = (): void => {
    setState(state => ({ ...state, questionNum: state.questionNum + 1 }));
    setQuestionState(state => ({...state, answer: '', answered: false }));
  }

  return (
    <div>

    
    <div className="p-4 bg-white rounded max-w-[500px]">
      <p className="text-center">Question {questionNum}/{questions.length}</p>
      <h3 className="text-xl my-4" dangerouslySetInnerHTML={{__html:currentQuestion.question}}/> 
      <div className="grid gap-2">
        {currentQuestion.answers.map((answer, i) => (
          <button
            key={i}
            className={` text-white text-center p-1 disabled:cursor-not-allowed ${
              QuestionState.answered 
              ? QuestionState.answerCorrect 
                ? currentQuestion.correct_answer === answer 
                  ? 'bg-green-500' 
                  : 'bg-blue-500 transition hover:bg-blue-600'
                : currentQuestion.correct_answer === answer  
                  ? 'bg-green-500' 
                  : 'bg-red-500'
              : 'bg-blue-500 transition hover:bg-blue-600'
            }`}
            disabled={QuestionState.answered}
            dangerouslySetInnerHTML={{__html: answer}}
            onClick={() => submitAnswer(answer)}/>
        ))}
      </div> 
      </div>  
       {QuestionState.answered && <button className="py-2 px-4 bg-white capitalize rounded mx-auto block mt-5" onClick={nextQuestion}>next question</button> }
      </div>
  );
};

export default QuestionCard;
