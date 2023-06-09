import React, { useContext, useState, useTransition, Link,useEffect } from 'react'
import {Button, Card, Container, Form, Row} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate, useParams } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'
import axios from 'axios';
import fileDownload from 'js-file-download'
import * as xlsx from 'xlsx'
import _ from 'lodash';
import { fetchOneExcercise,fetchOneFileAsJson } from '../http/excerciseAPI';
const Excercise = observer(() => {

    const { id } = useParams()
    const [excercise, setExcercise] = useState(undefined)
    const [fileFromDb, setFile] = useState(undefined)
    const [fileFromUser, setFileFromUser] = useState(undefined)
    
    const [usr_formula, setUsrFormula] = useState('')
    const [check, setCheck] = useState(false)
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
      fetchOneExcercise(id).then(data => setExcercise(data))
      if (excercise?.fileForCompare) {
        fetchOneFileAsJson(id).then(data => setFile(data))
    }
    }, [id])  
     
    console.log('fileFromDb=',fileFromDb)
    console.log('excercise?.fileForCompare=',excercise?.fileForCompare)


    const checkFormula = () => {
        setClicked(true)
        if (usr_formula === excercise.rightAnswer)
            setCheck(true)
        else
            setCheck(false)
    }

    const readUploadFile = (e) => {
        e.preventDefault();
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
    
    console.log('fileFromUser=',fileFromUser);
    
    const compareFiles = (object1, object2) => {
      console.log('lodash=',_.isEqual(object1, object2))
    }
    
  return (
    
    <Container className='d-flex justify-content-center align-items-center flex-column'
    >
        <Container >
        <div dangerouslySetInnerHTML={{ __html: excercise?.text }} />
        </Container>
        <a
        href={`http://localhost:5000/static/${excercise?.fileForCompare}`}
        >
        <Button
        className='mt-1 mb-2 rounded-5' variant='warning'
        >Скачать таблицу</Button>
        </a>
        <Form className='d-flex align-items-center flex-column'>
            {
                excercise?.fileForCompare ? 
                <>
                 <p>Загрузить файл:</p>
                <Form.Control
                    className='rounded-5'
                    placeholder='dfklgk'
                    type='file'
                    style={{width:250}}
                    name='upload'
                    id='upload'
                    onChange={readUploadFile}
                />
                <Button className='mt-3 rounded-5' variant={'outline-success'}
               onClick={() =>compareFiles(fileFromUser, fileFromDb)}
                >
                  Загрузить</Button>
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
                <Button className='mt-3 mb-3 rounded-5' variant={'outline-success'}
                onClick={() => checkFormula()}
                >
                Проверить</Button>
                {
                    clicked ? (check ?
                        <p className="text-success"> Правильно! </p>
                        : <p className="text-danger"> Неправильно! Попробуйте ещё раз </p>)
                        : ''
                }
              </>  
                : ''
            }
        </Form>
    </Container>
  );
});

export default Excercise;