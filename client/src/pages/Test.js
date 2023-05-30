import React, { useContext, useState, useTransition, useEffect } from 'react'
import {Button, Card, Container, Form, Row,ListGroup} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate,useParams } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE,TEST_ROUTE } from '../utils/consts';
import { check, login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'
import { fetchAnswers, fetchQuestions,fetchOneQuestion } from '../http/testAPI';
import { createResult } from '../http/testAPI';
const Test = observer(() => {
  /*
    const history =useNavigate()
    const {answer1}=useContext(Context)
    const {user}=useContext(Context)
    
    const {question1} = useContext(Context)

    const [question, setQuestion] = useState({info: []})
    
    const {id}=useParams()
    
    useEffect(() => {
        fetchOneQuestion(id).then(data => setQuestion(data))
        fetchAnswers().then(data => answer1.setAnswers(data))
        fetchQuestions().then(data => question1.setQuestions(data))
    }, [])
const [result,setResult] = useState('')
const [questionId,setQuestionId] = useState('')
const [answerId,setAnswerId] = useState('')
const [userId,setUserId] = useState('')

const [score, setScore] = useState(0);
let nextQuestion=question.id+1
console.log(nextQuestion)
const click = async () => {
    try {
        let data;
    //    data = await createResult(result,questionId,answerId,userId)   
        console.log(nextQuestion)
        history(TEST_ROUTE  + '/'+ nextQuestion)
    } catch (e) {
        alert(e.response.data.message)
    }
}

const handleAnswerOptionClick = (correct) => {
    if (correct) {
        setScore(score + 1);
    }
};

const showScore = async () => {
console.log(score)
};

//получить id пользователя
const getUser = async () => {
    await check().then((data1) => {
       // console.log(typeof data1.id);
      //  console.log(data1.id);
        setUserId(data1.id)
        return data1;
      })
    }

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column"
    >
      {question1.questions.map(question => 
      <h2>{question1.countQuestions}</h2>
      )
      }

        <h2>Вопрос {question.id} </h2>
        <h4>
        {question.name}
        </h4>        
<Form className='flex-column d-flex justify-content-center '>
{answer1.answers.map(answer => 
          question.id===answer.questionId ? 
          <Button
          className='mt-1 mb-1'
          variant={"outline-success"}
          active={answer.id === answer1.selectedAnswer.id}
          key={answer.id}
          onClick={
            () => {answer1.setSelectedAnswer(answer)
                setAnswerId(answer.id)
                setQuestionId(answer.questionId)
                setResult(answer.correct)
                getUser()
                handleAnswerOptionClick(answer.correct)
            }
        } > 
        {answer.name}
        </Button> : null       
)}
</Form>
  <Button className='ms-2 mt-2' onClick={click}> Далее</Button>
  <Button className='ms-2 mt-2' onClick={showScore}> Показать результаты</Button>
    </Container>

  );
  */
});

export default Test;