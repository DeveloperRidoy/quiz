import { EStatus, useStateContext } from "../hoc/context/StateContext";

const ScoreCard = () => {
  const { state: { score, questions }, setState } = useStateContext();
  
  const calcPercentage = (): number => Math.round(score / questions.length * 100);

  // restart quiz
  const reStart = (): void => setState(state => ({ ...state, status: EStatus.NOT_STARTED, questions: [], score: 0, questionNum: 1 }));
 
  return <div className="grid gap-5 justify-items-center">
    <h4 className="text-3xl text-white capitalize">your score: {score}/{questions.length}({calcPercentage()}%)</h4> 
    <button className="bg-white py-2 px-4 rounded capitalize" onClick={reStart}>play again</button>
  </div>;
};

export default ScoreCard;
