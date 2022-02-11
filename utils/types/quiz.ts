import { Dispatch } from "react";

export enum EQuestionDifficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard',
}

export enum EQuestionType {
  MULTIPLE = 'multiple',
  BOOLEAN = 'boolean',
}

export enum EQuizStatus {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export interface IQuizQuestion {
  category: string
  type: EQuestionType
  difficulty: EQuestionDifficulty
  question: string
  correct_answer: string
  incorrect_answers: string[]
  answers: string[]
}

export interface IQuizState {
  status: EQuizStatus
  questions: IQuizQuestion[]
  score: number
  questionNum: number
}

export interface IQuizContext {
  state: IQuizState
  dispatch: Dispatch<IQuizAction>
}

export enum EQuizActionType {
  START_QUIZ = 'START_QUIZ',
  UPDATE_SCORE = 'UPDATE_SCORE',
  NEXT_QUESTIN = 'NEXT_QUESTIN',
  END_QUIZ = 'END_QUIZ',
  RESET_QUIZ = 'RESET_QUIZ',
}

export interface IQuizAction {
  type: EQuizActionType
  payload?: any
}
