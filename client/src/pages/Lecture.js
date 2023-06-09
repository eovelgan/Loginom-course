import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap';
import {  useNavigate, useParams } from 'react-router-dom';
import { EXCERCISE_ROUTE } from '../utils/consts';
import { check } from '../http/userAPI';
import { observer } from 'mobx-react-lite'
import { fetchLecture } from '../http/lectureAPI';
import { LECTURE_ROUTE } from '../utils/consts';
import { updateLectureProgress } from '../http/progressAPI';


const Lecture = observer(() => {
  const { id } = useParams()

  const history = useNavigate()

  const [lecture, setLecture] = useState(undefined)
  const [userId, setUserId] = useState(0)

  check().then((data) => {
    setUserId(data.id)
  })

  useEffect(() => {
    fetchLecture(id).then(data => {
      setLecture(data)
      updateLectureProgress(data?.id, userId);
    })
  }, [id, userId])

  return (
    <Container className="d-flex justify-content-center">
      <div>
        <div dangerouslySetInnerHTML={{ __html: lecture?.text }} />
        <Container className='d-flex'>
        {
          lecture?.prev_id
            ?
            <Container className='d-flex justify-content-start'>
              <Button
                variant='success'
                className='mt-3 mb-3 rounded-5'
                onClick={() => history(LECTURE_ROUTE + '/' + lecture.prev_id)}
              > К предыдущей лекции</Button>
            </Container>
            : ''
        }

        {
          lecture?.id===6?
          <Container className='d-flex justify-content-end'>
          <Button
            variant='outline-success'
            className='mt-3 mb-3 rounded-5'
            onClick={() => history(EXCERCISE_ROUTE + '/1')}
          > Открыть практическое задание</Button>
        </Container>
          : ''
        }
        {
          lecture?.id===7 ?
          <Container className='d-flex justify-content-end'>
          <Button
            variant='outline-success'
            className='mt-3 mb-3 rounded-5'
            onClick={() => history(EXCERCISE_ROUTE + '/2')}
          > Открыть практическое задание</Button>
        </Container>
          : ''
        }
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
         </Container>
      </div>
    </Container>
  );
});

export default Lecture;