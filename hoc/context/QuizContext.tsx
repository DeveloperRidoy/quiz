import React, { createContext, useContext, useReducer} from "react";
import quizReducer from "../../reducers/quizReducer";
import { EQuizStatus, IQuizContext } from "../../utils/types/quiz";

const InitialContext: IQuizContext = {
  state: {
    status: EQuizStatus.NOT_STARTED,
    questions: [],
    score: 0,
    questionNum: 1,
  },
  dispatch: () => {},
}

const Context = createContext<IQuizContext>(InitialContext); 

export const useQuizContext = () => useContext(Context);

const QuizContext: React.FC = ({children}) => {
  const [state, dispatch] = useReducer(quizReducer, InitialContext.state);

  return <Context.Provider value={{state, dispatch}}>{children}</Context.Provider>
};

export default QuizContext;
