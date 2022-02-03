import React, { useState } from "react";
import { EStatus, IQuestion, useStateContext } from "../context/StateContext";
import { apiBaseUrl } from "../utils/config";
import {difficulties, EDifficulty, EType, questionCategories, types} from "../utils/settings";
import shuffleArray from "../utils/shuffleArray";
;


const QuizStartForm = () => {

  const { setState } = useStateContext();

  interface data {
    questionsCount: number | '',
    category: number | '', 
    difficulty: EDifficulty | '', 
    type: EType | '', 

  }

  const initialData: data = {
    questionsCount: 10, 
    category: '', 
    difficulty: '', 
    type: ''
  }
  const [data, setData] = useState<data>(initialData); 

  const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    setData(data => ({ ...data, [e.target.name]: e.target.value }));
  }

  const startQuiz = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    try {
      e.preventDefault();
      setState(state => ({ ...state, status: EStatus.LOADING }));

      const response = await fetch(`${apiBaseUrl}?amount=${data.questionsCount}&category=${data.category}&difficulty=${data.difficulty}&type=${data.type}`); 
  
      const questions = (await response.json()).results.map((question: IQuestion) => ({
        ...question, 
        answers: shuffleArray([...question.incorrect_answers, question.correct_answer]), 
      }));

      setState(state => ({ ...state, status: EStatus.STARTED, questions, questionNum: 1 }));
    } catch (error: any) {
      setState(state => ({...state, error: error.response?.message || error.message || 'network error'}))
    }
    }
  return (
    <form className="p-4 bg-white rounded grid gap-3" onSubmit={startQuiz}>
      <div className="grid gap-1">
        <label htmlFor="questionsCount" className="capitalize">total questions</label> 
        <input type="number" name="questionsCount" id="questionsCount" className="border border-gray-400 rounded py-1 px-2" value={data.questionsCount} onChange={inputChange} min={0} max={50} required/>
      </div>
      <div className="grid">
        <label htmlFor="category" className="capitalize">select category</label> 
        <select name="category" id="category" className="border border-gray-400 rounded py-1 px-2 capitalize" value={data.category} onChange={inputChange} >
          <option value="">any</option> 
          {questionCategories.map(category => <option value={category.id} key={category.id}>{category.name}</option> )}
        </select>
      </div>
      <div className="grid">
        <label htmlFor="difficulty" className="capitalize">select difficulty</label> 
        <select name="difficulty" id="difficulty" className="border border-gray-400 rounded py-1 px-2 capitalize" value={data.difficulty} onChange={inputChange}>
          <option value="">any</option> 
          {difficulties.map((difficulty, i) => <option value={difficulty} key={i}>{difficulty}</option> )}
        </select>
      </div>
      <div className="grid">
        <label htmlFor="type" className="capitalize">select type</label> 
        <select name="type" id="type" className="border border-gray-400 rounded py-1 px-2 capitalize" value={data.type} onChange={inputChange} >
          <option value="">any</option> 
          {types.map((type, i) => <option value={type} key={i}>{type === EType.BOOLEAN ? 'true or false': 'multiple choice'}</option> )}
        </select>
      </div> 
      <button className="bg-blue-500 text-white py-1 px-5 capitalize rounded">start</button>
    </form>
  )
};

export default QuizStartForm;
