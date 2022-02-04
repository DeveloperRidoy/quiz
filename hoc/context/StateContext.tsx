import React, { createContext, Dispatch, ReactChild, SetStateAction, useContext, useState } from "react";
import { EDifficulty, EType } from "../../utils/settings";

export enum EStatus {
  NOT_STARTED = 'NOT_STARTED',
  LOADING = 'LOADING', 
  STARTED = 'STARTED', 
  FINISHED = 'FINISHED',
}

export interface IQuestion  {
  category: string,  
  type: EType, 
  difficulty: EDifficulty, 
  question: string, 
  correct_answer: string,  
  incorrect_answers: string[],
  answers: string[],
}

type TState = {
  status: EStatus
  questions: IQuestion[],
  score: number, 
  questionNum: number, 
  error?: string
}


interface IContext {
  state: TState, 
  setState: Dispatch<SetStateAction<TState>>
}

const InitialContext: IContext = {
  state: {
    status: EStatus.NOT_STARTED,
    questions: [], 
    score: 0, 
    questionNum: 1
  }, 
  setState: () => {}
}

const Context = createContext<IContext>(InitialContext); 

export const useStateContext = () => useContext(Context);

const StateContext: React.FC = ({children}) => {
  const [state, setState] = useState(InitialContext.state); 

  return <Context.Provider value={{state, setState}}>{children}</Context.Provider>
};

export default StateContext;
