import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import UserCourse from './course/UserCourse'
import QuestionCourse from './course/QuestionCourse';
import AnswerCourse from './course/AnswerCourse';
import ResultCourse from './course/ResultCourse';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserCourse(),
    question1: new QuestionCourse(),
    answer1: new AnswerCourse(),
    result1: new ResultCourse(),
  }}>
    <App />
  </Context.Provider>
);