import React, { useContext, useState, useTransition, Link, useEffect } from 'react'
import { Button, Card, Container, Form, Row } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE } from '../utils/consts';
import { check } from '../http/userAPI';
import { Context } from '..';
import { observer } from 'mobx-react-lite'
import axios from 'axios';
import fileDownload from 'js-file-download'
import * as xlsx from 'xlsx'
import _ from 'lodash';
import { fetchOneExcercise, fetchOneFileAsJson } from '../http/excerciseAPI';
import { checkExcercise, updateExcerciseProgress } from '../http/progressAPI';


const Excercise = observer(() => {

  const { id } = useParams()
  const [excercise, setExcercise] = useState(undefined)
  const [fileFromDb, setFile] = useState(undefined)
  const [fileFromUser, setFileFromUser] = useState(undefined)

  const [usr_formula, setUsrFormula] = useState('')
  const [doCheck, setCheck] = useState(false)
  const [clicked, setClicked] = useState(false)

  const [userId, setUserId] = useState(0)

  check().then((data1) => {
    setUserId(data1.id)
  })

  useEffect(() => {
    fetchOneExcercise(id).then(data => setExcercise(data))
    setClicked(false)
  }, [id])
  console.log('fileFromUser', fileFromUser)
  const checkAnswer = async () => {
    setClicked(true)

    const res = await checkExcercise(excercise.id, usr_formula, fileFromUser)
    
    console.log('check res', res)

    if (res && res.textAnswerCorrect && res.fileAnswerCorrect) {
      setCheck(true)
      await updateExcerciseProgress(excercise.id, userId)
    } else {
      setCheck(false)
    }
  }

  const fileValidation = () =>{
    var fileInput =
        document.getElementById('upload');
     
    var filePath = fileInput.value;
 
    // Allowing file type
    var allowedExtensions =
            /(\.xlsx|\.xls)$/i;
     
    if (!allowedExtensions.exec(filePath)) {
        alert('Пожалуйста, загрузите файл в формате .xlsx или .xls!');
        fileInput.value = '';
        return false;
    }
}


  const readUploadFile = (e) => {
    e.preventDefault();
    if (fileValidation()!==false)
    {
      if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = xlsx.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          setFileFromUser(xlsx.utils.sheet_to_json(worksheet));
        };
        reader.readAsArrayBuffer(e.target.files[0]);
      }
    }


  }

  return (

    <Container className='d-flex justify-content-center align-items-center flex-column'
    >
      <Container >
        <div dangerouslySetInnerHTML={{ __html: excercise?.text }} />
      </Container>

      {
        excercise?.fileForDownload
          ? <a href={`http://localhost:5000/static/${excercise?.fileForDownload}`}>
            <Button className='mt-1 mb-2 rounded-5' variant='warning'>Скачать таблицу</Button>
          </a>
          : null
      }


      <Form className='d-flex align-items-center flex-column'>
        {
          excercise?.fileForCompare ?
            <>
              <p>Загрузить файл:</p>
              <Form.Control
                className='rounded-5'
                type='file'
                name='upload'
                id='upload'
                onChange={readUploadFile}
              />
            </>
            : null
        }
        {
          excercise?.rightAnswer
            ?
            <>
              <Form.Control
                style={{ width: 300 }}
                className='mt-2 rounded-0'
                placeholder='Введите итоговую формулу'
                value={usr_formula}
                onChange={e => setUsrFormula(e.target.value)}
              >
              </Form.Control>
            </>
            : ''
        }

        <Button className='mt-3 mb-3 rounded-5' variant={'outline-success'}
          onClick={() => checkAnswer()}>
          Проверить</Button>
        {
          clicked ? (doCheck ?
            <p className="text-success"> Правильно! </p>
            : <p className="text-danger"> Неправильно! Попробуйте ещё раз </p>)
            : ''
        }
      </Form>
    </Container>
  );
});

export default Excercise;