import React, { useContext, useState, useTransition, useEffect } from 'react'
import {Button, Card, Container, Form, Row,ListGroup, Table} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate,useParams } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE,TEST_ROUTE } from '../utils/consts';
import { check, login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'
import { fetchAnswers, fetchQuestions,fetchOneQuestion, fetchResults, fetchCountRight } from '../http/testAPI';
import { createResult } from '../http/testAPI';
const EXAMPLETEST = observer(() => {
    const history =useNavigate()
    const {answer1}=useContext(Context)
    const {user}=useContext(Context)
    const {result1}=useContext(Context)
    const {question1} = useContext(Context)

   // const [question, setQuestion] = useState({info: []})

   // const {id}=useParams()
   const [result,setResult] = useState('')
   const [questionId,setQuestionId] = useState('')
   const [answerId,setAnswerId] = useState('')
   const [userId,setUserId] = useState(0)

check().then((data1) => {
       // console.log(typeof data1.id);
      //  console.log(data1.id);
        setUserId(data1.id)
    //    return data1;
      })
      console.log(typeof userId)
      
   useEffect(() => {
    //    fetchOneQuestion(id).then(data => setQuestion(data))
        fetchAnswers().then(data => answer1.setAnswers(data))
        fetchQuestions().then(data => question1.setQuestions(data))
        fetchResults(userId).then(data => result1.setResults(data))
        fetchCountRight(userId).then(data => result1.setRightResults(data))
    }, [])

 
let   count=question1.countQuestions

let nextQuestion=1

//получить id пользователя
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [clickedStart, setClickedStart] = useState(false);
    const [clickedResult, setClickedResult] = useState(false);

    const handleAnswerOptionClick = () => {
        let data;
        data = createResult(result,questionId,answerId,userId)   
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < count) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

    const clickStart = () => {
        setClickedStart(true)
	};

    const clickResult = () => {
        setClickedResult(true)
	};

  return (
    <Container className="d-flex justify-content-center align-items-center flex-column"
    >  
<Container className='d-flex justify-content-center align-items-center flex-column'
style={clickedStart ? {height:0} : {height:500}  }>
<Button className={clickedStart ? 'mt-2 rounded-5 invisible' : 'mt-2 rounded-5'} 
variant='success'
onClick={() => {clickStart()}}
>Начать тестирование</Button>
</Container>
Ваш результат: {result1.rightResults} из {count}

<Table striped bordered hover>
            <thead>
                <tr>
                <th>ид результата</th>
                <th>Вопрос</th>
                <th>Выбранный ответ</th>
                <th>Правильность</th>
                </tr>
            </thead>
        { question1.questions.map(question =>
        ( result1.results.map(result =>
            (answer1.answers.map(answer =>
            question.id===result.questionId && answer.id===result.answerId ? 
            <tbody>
                <tr>
                <td>{result.id}</td>
                <td>{result.questionId}. {question.name}</td>
                <td>{answer.name}</td>
                <td>{result.result ?  <p className="text-success fw-bold"> Верно </p> :  <p className="text-danger fw-bold"> Неверно </p>}</td>
                </tr>
            </tbody>
            : null
            ))))
            )}
</Table>


{clickedStart ? 
    (showScore ? (
        <div className='d-flex align-items-center flex-column'>
            Ваш результат: {result1.rightResults} из {count}
            <Button className='mt-2 mb-2 rounded-5' variant='success'
            onClick={() => {clickResult()}}
            >Подробный отчёт</Button> 
             { clickedResult ? 
             <Table striped bordered hover>
            <thead>
                <tr>
                <th>ид результата</th>
                <th>Вопрос</th>
                <th>Выбранный ответ</th>
                <th>Правильность</th>
                </tr>
            </thead>
        { question1.questions.map(question =>
        ( result1.results.map(result =>
            (answer1.answers.map(answer =>
            question.id===result.questionId && answer.id===result.answerId ? 
            <tbody>
                <tr>
                <td>{result.id}</td>
                <td>{result.questionId}. {question.name}</td>
                <td>{answer.name}</td>
                <td>{result.result ?  <p className="text-success fw-bold"> Верно </p> :  <p className="text-danger fw-bold"> Неверно </p>}</td>
                </tr>
            </tbody>
            : null
            ))))
            )}
</Table>
             
             : null
                
             }
        </div>
    ) : 
        <>
    <h2>Вопрос {currentQuestion + 1}/{count} </h2>
        {
        question1.questions[currentQuestion].name
        }
        <Form className='flex-column d-flex justify-content-center '>
        {      
        answer1.answers.map(answer => 
            question1.questions[currentQuestion].id===answer.questionId ? 
            <Button
            className='mt-1 mb-1 rounded-0'
            variant={"outline-dark"}
            active={answer.id === answer1.selectedAnswer.id}
            key={answer.id}
            onClick={
            () => {answer1.setSelectedAnswer(answer)
                setAnswerId(answer.id)
                setQuestionId(answer.questionId)
                setResult(answer.correct)
              //  getUser()
                console.log(result)
            //      handleAnswerOptionClick(answer.correct)
                    }
                } > 
            {answer.name}
            </Button> : null       
            )
            }
        </Form>
        <Button className='ms-2 mt-2 mb-3 rounded-5' variant='warning' onClick={() => 
        handleAnswerOptionClick()}> Далее</Button>
    </>
    )
: null 
}
    </Container>
  );
});

export default EXAMPLETEST;