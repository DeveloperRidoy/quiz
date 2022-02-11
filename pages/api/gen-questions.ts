import { NextApiRequest, NextApiResponse } from "next"
import AppError from "../../utils/server/AppError"
import nc from "../../utils/server/middlewares/nc"
import { QUESTIONS_API } from "../../utils/config"
import shuffleArray from "../../utils/shuffleArray"
import { IApiResponse } from "../../utils/types/types"
import { IQuizQuestion } from "../../utils/types/quiz"

const genQuestions = async (req: NextApiRequest, res: NextApiResponse, next: any) => {

  const { amount, category, difficulty, type } = req.query
  
    // validation
    if (amount && isNaN(Number(amount))) return next(new AppError(400, 'amount must be a number'));
    if (category && isNaN(Number(category))) return next(new AppError(400, 'category must be a number'));
    
   const response = await fetch(
     `${QUESTIONS_API}?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
   )

  
   const questions = (await response.json()).results.map(
     (question: IQuizQuestion) => ({
       ...question,
       answers: shuffleArray([
         ...question.incorrect_answers,
         question.correct_answer,
       ]),
     })
   )

  return res.json(<IApiResponse>{
    status: 'success',
    message: 'successfully generated questions',
    data: {
      questions
    },
  })
}

const handler = nc().get(genQuestions)

export default handler
