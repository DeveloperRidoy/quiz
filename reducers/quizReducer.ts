import {
    EQuizActionType,
    EQuizStatus,
    IQuizAction,
    IQuizState,
} from '../utils/types/quiz';

const quizReducer = (state: IQuizState, action: IQuizAction): IQuizState => {
  const { type, payload } = action

  switch (type) {
    case EQuizActionType.START_QUIZ:
      return {
        ...state,
        status: EQuizStatus.STARTED,
        score: 0,
        questions: payload.questions,
        questionNum: 1,
      }

    case EQuizActionType.END_QUIZ:
      return { ...state, status: EQuizStatus.FINISHED }

    case EQuizActionType.RESET_QUIZ:
      return {
        ...state,
        status: EQuizStatus.NOT_STARTED,
        score: 0,
        questionNum: 1,
        questions: [],
      }

    case EQuizActionType.UPDATE_SCORE:
      const lastQuestion = state.questionNum === state.questions.length
      return {
        ...state,
        score: payload.score,
        status: lastQuestion ? EQuizStatus.FINISHED : state.status,
      }

    case EQuizActionType.NEXT_QUESTIN:
      return { ...state, questionNum: state.questionNum + 1 }
    default:
      return state
  }
}

export default quizReducer
