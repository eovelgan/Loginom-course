import React, { useContext, useState, useTransition, useEffect } from 'react'
import { Button, Card, Container, Form, Row, ListGroup, Table } from 'react-bootstrap';
import { check, fetchUser } from '../http/userAPI';
import { Context } from '..';
import { observer } from 'mobx-react-lite'
import { fetchLectureProgress, fetchExcerciseProgress } from '../http/progressAPI';
import { fetchAnswers, fetchQuestions, fetchResults } from '../http/testAPI';
const Cabinet = observer(() => {
  const { answer1 } = useContext(Context)
  const { result1 } = useContext(Context)
  const { question1 } = useContext(Context)
  const [lectureProgress, setLectureProgress] = useState([])
  const [excerciseProgress, setexcerciseProgress] = useState([])
  const [userId, setUserId] = useState(0)
  const [user, setUser] = useState([])

  check().then((data1) => {
    setUserId(data1.id)
  })
  useEffect(() => {
    fetchUser(userId).then(data=>setUser(data))
    fetchLectureProgress(userId).then(data => setLectureProgress(data))
    fetchExcerciseProgress(userId).then(data => setexcerciseProgress(data))
    fetchAnswers().then(data => answer1.setAnswers(data))
    fetchQuestions().then(data => question1.setQuestions(data))
    fetchResults(userId).then(data => result1.setResults(data))
  }, [userId])

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center">
      <p>Ваше имя:</p> 
      <p>{user?.lastname} {user?.firstname} {user?.surname}  </p>
      {
        lectureProgress.length
          ?
          <>
            <Table striped bordered hover 
            style={{ width: 700 }} 
            >
              <caption> <h6>Вы уже изучили следующие лекции:</h6></caption>
              <thead>
                <tr>
                  <th>Название лекции</th>
                  <th>Дата изучения</th>
                </tr>
              </thead>
              <tbody>
              {
                lectureProgress.map(lecture =>
                  (
                    <tr>
                      <td>{lecture.name}</td>
                      <td>{lecture.User_Lecture.updatedAt.substring(0, 10)}</td>
                    </tr>
                  )
                  
                )
                
              }
              </tbody>
            </Table>
          </>
          : <div><p>Вы не изучили ни одной лекции</p></div>                                 
      }

{
        excerciseProgress.length
          ?
          <>
            <Table striped bordered hover
            style={{ width: 700 }} 
            >
              <caption> <h6>Вы уже выполнили следующие практические задания:</h6></caption>
              <thead>
                <tr>
                  <th>Название практического задания</th>
                  <th>Дата прохождения</th>
                </tr>
              </thead>
              <tbody>
              {
                excerciseProgress.map(excercise =>
                (
                  <tr>
                    <td>{excercise.name}</td>
                    <td>{excercise.User_Excercise.updatedAt.substring(0, 10)}</td>
                  </tr>
                ))
              }
              </tbody>
            </Table>
          </>
          : <div><p>Вы ещё не выполнили ни одного практического задания</p></div>
      }

{
        result1.results[0]
          ?
          <>
            <Table striped bordered hover
            style={{ width: 700 }} 
            >
            <caption> <h6>Ваши результаты тестирования:</h6></caption>
                <thead>
                    <tr>
                        <th>Вопрос</th>
                        <th>Выбранный ответ</th>
                        <th>Правильность</th>
                    </tr>
                </thead>
                {question1.questions.map(question =>
                (result1.results.map(result =>
                (answer1.answers.map(answer =>
                    question.id === result.questionId && answer.id === result.answerId ?
                        <tbody>
                            <tr>
                                <td>{result.questionId}. {question.name}</td>
                                <td>{answer.name}</td>
                                <td>{result.result ? <p className="text-success fw-bold"> Верно </p> : <p className="text-danger fw-bold"> Неверно </p>}</td>
                            </tr>
                        </tbody>
                        : null
                ))))
                )}
            </Table>
          </>
          : <div><p>Вы ещё не прошли тестирование</p></div>                                 
      }

    </Container>
  );
});

export default Cabinet;
