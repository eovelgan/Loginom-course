import React, { useContext, useState, useTransition, Link } from 'react'
import {Button, Card, Container, Form, Row} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate, useParams } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'
import { fetchOneFile } from '../http/fileAPI';
import axios from 'axios';
import fileDownload from 'js-file-download'

const Excercise = observer(() => {

  const downloadFile = async () => {
      try {
        const response=await axios.get('http://localhost:5000/api/file/2')
          
        console.log(response.data)
      } catch (e) {
        alert(e.response.data.message)
      }
  }

  return (
    
    <Container className="d-flex justify-content-center align-items-center"
    >

 <Form className='d-flex align-items-center flex-column'> 
 <h3> Практическое задание по теме Дубликаты и противоречия</h3>
 <p>
 Создайте сценарий,  который будет удалять из данной таблицы дубликаты и противоречия, 
 используя несколько следующие обработчики: дубликаты и противоречия, 
 фильтр строк, группировка и объединение. Полученную таблицу в формате .xlsx загрузите на портал.
 </p>
 <Button className='mb-2 rounded-5' variant={'warning'} 
 onClick={() =>downloadFile()}
 >Скачать таблицу</Button>
<p>Загрузить файл:</p>
    <Form.Control
        className='mt-1 rounded-5'
        placeholder='dfklgk'
        type='file'
        style={{width:250}}
    />
    <Button className='mt-3 rounded-5' variant={'outline-success'}>Загрузить</Button>

 </Form>
    </Container>
  );
});

export default Excercise;