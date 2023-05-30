import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import UserCourse from './course/UserCourse'
//import DeviceStore from './course/DeviceStore';
import QuestionCourse from './course/QuestionCourse';
import AnswerCourse from './course/AnswerCourse';
import ResultCourse from './course/ResultCourse';
import FormulaCourse from './course/FormulaCourse';


export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserCourse(),
 //   device: new DeviceStore(),
    question1: new QuestionCourse(),
    answer1: new AnswerCourse(),
    result1: new ResultCourse(),
    formula: new FormulaCourse()
  }}>
    <App/>
  </Context.Provider>

);