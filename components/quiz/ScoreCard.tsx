import { useQuizContext } from "../../hoc/context/QuizContext";
import { EQuizActionType } from "../../utils/types/quiz";

const ScoreCard = () => {
  const { state: { score, questions }, dispatch } = useQuizContext();
  
  const calcPercentage = (): number => Math.round(score / questions.length * 100);

  // reset quiz
  const reset = (): void => dispatch({ type: EQuizActionType.RESET_QUIZ });
 
  return <div className="grid gap-5 justify-items-center">
    <h4 className="text-3xl text-white capitalize">your score: {score}/{questions.length}({calcPercentage()}%)</h4> 
    <button className="bg-white py-2 px-4 rounded capitalize" onClick={reset}>play again</button>
  </div>;
};

export default ScoreCard;
