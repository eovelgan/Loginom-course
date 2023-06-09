import React, { useContext, useState, useTransition, useEffect } from 'react'
import { Button, Card, Container, Form, Row, Table, Image } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { INTERFACE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE } from '../utils/consts';
import { check,login, registration } from '../http/userAPI';
import { Context } from '..';
import { observer } from 'mobx-react-lite'
import isAuth from '../course/UserCourse'
import { fetchLecture } from '../http/lectureAPI';
import { LECTURE_ROUTE } from '../utils/consts';
import { fetchLectureProgress } from '../http/progressAPI';


const Lecture = observer(() => {
  const { id } = useParams()
  const { user } = useContext(Context)

  const location = useLocation()
  const history = useNavigate()
  const isLogin = location.pathname === LOGIN_ROUTE

  const [lecture, setLecture] = useState(undefined)
  const [lectureProgress, setLectureProgress] = useState(undefined)

  const [userId, setUserId] = useState(0)
  
  check().then((data1) => {
    // console.log(typeof data1.id);
    //  console.log(data1.id);
    setUserId(data1.id)
    //    return data1;
})
console.log('userId=', userId)

  useEffect(() => {
    fetchLecture(id).then(data => setLecture(data))
    fetchLectureProgress(userId).then(data => setLectureProgress(data))
  }, [])

  console.log('lectureProgress=', lectureProgress?.lectureId)
  return (
    <Container className="d-flex justify-content-center">
      <div >
        <div dangerouslySetInnerHTML={{ __html: lecture?.text }} />

        {
        lecture?.next_id
          ?
          <Container className='d-flex justify-content-end'>
            <Button
              variant='success'
              className='mt-3 mb-3 rounded-5'
              onClick={() => history(LECTURE_ROUTE + '/' + lecture.next_id)}
            > К следующей лекции</Button>
          </Container>
          : ''
        }
      </div>
    </Container>
  );
});

export default Lecture;