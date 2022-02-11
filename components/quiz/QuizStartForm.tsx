import axios from 'axios'
import React, { useState } from 'react'
import {
  useQuizContext,
} from '../../hoc/context/QuizContext'

import {
  difficulties,
  questionCategories,
  types,
} from '../../utils/quizSettings'
import shuffleArray from '../../utils/shuffleArray'
import Spinner from '../spinners/spinner/Spinner'
import { EQuestionDifficulty, EQuestionType, EQuizActionType, IQuizQuestion } from '../../utils/types/quiz'

const QuizStartForm = () => {
  const { dispatch } = useQuizContext()

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); 

  interface data {
    questionsCount: number | ''
    category: number | ''
    difficulty: EQuestionDifficulty | ''
    type: EQuestionType | ''
  }

  const initialData: data = {
    questionsCount: 10,
    category: '',
    difficulty: '',
    type: '',
  }
  const [data, setData] = useState<data>(initialData)

  const inputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }))
  }

  const startQuiz = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault()
      setLoading(true);

      const response = await axios.get(
        `/api/gen-questions?amount=${data.questionsCount}&category=${data.category}&difficulty=${data.difficulty}&type=${data.type}`
      )

      const questions = response.data.data.questions.map(
        (question: IQuizQuestion) => ({
          ...question,
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
        })
      )

      dispatch({ type: EQuizActionType.START_QUIZ, payload: { questions } });
    } catch (error: any) {
      setLoading(false); 
      setError(error.response?.data.message ?? error.message ?? 'network error');
    }
  }

  if(loading) return <Spinner className='absolute top-1/2 -translate-y-1/2'/>
  
  return (
    <form className="grid gap-3 rounded bg-white p-4" onSubmit={startQuiz}>
      <div className="grid gap-1">
        <label htmlFor="questionsCount" className="capitalize">
          total questions
        </label>
        <input
          type="number"
          name="questionsCount"
          id="questionsCount"
          className="rounded border border-gray-400 py-1 px-2"
          value={data.questionsCount}
          onChange={inputChange}
          min={0}
          max={50}
          required
        />
      </div>
      <div className="grid">
        <label htmlFor="category" className="capitalize">
          select category
        </label>
        <select
          name="category"
          id="category"
          className="rounded border border-gray-400 py-1 px-2 capitalize"
          value={data.category}
          onChange={inputChange}
        >
          <option value="">any</option>
          {questionCategories.map((category) => (
            <option value={category.id} key={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid">
        <label htmlFor="difficulty" className="capitalize">
          select difficulty
        </label>
        <select
          name="difficulty"
          id="difficulty"
          className="rounded border border-gray-400 py-1 px-2 capitalize"
          value={data.difficulty}
          onChange={inputChange}
        >
          <option value="">any</option>
          {difficulties.map((difficulty, i) => (
            <option value={difficulty} key={i}>
              {difficulty}
            </option>
          ))}
        </select>
      </div>
      <div className="grid">
        <label htmlFor="type" className="capitalize">
          select type
        </label>
        <select
          name="type"
          id="type"
          className="rounded border border-gray-400 py-1 px-2 capitalize"
          value={data.type}
          onChange={inputChange}
        >
          <option value="">any</option>
          {types.map((type, i) => (
            <option value={type} key={i}>
              {type === EQuestionType.BOOLEAN ? 'true or false' : 'multiple choice'}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 text-center">{error}</p> }
      <button className="rounded bg-blue-500 py-1 px-5 capitalize text-white">
        start
      </button>
    </form>
  )
}

export default QuizStartForm
