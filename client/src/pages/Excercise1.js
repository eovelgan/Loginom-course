import React, { useContext, useState, useTransition, Link,useEffect } from 'react'
import {Button, Card, Container, Form, Row, ToggleButton} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate, useParams } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'
import { fetchOneFormula } from '../http/formulaAPI';
import axios from 'axios';
import fileDownload from 'js-file-download'

const Excercise1 = observer(() => {

    const [usr_formula,setUsrFormula] = useState('')
    const [check,setCheck] = useState(false)
    const [clicked,setClicked] = useState(false)
    const [formula, setFormula] = useState({info: []})
    const id = 1
    useEffect(() => {
        fetchOneFormula(id).then(data => setFormula(data))
    }, [])
    const checkFormula = () => {
        setClicked(true)
        if (usr_formula===formula.value) 
        setCheck(true)
        else 
        setCheck(false)
    }
    
    return (       
        
        <Container className="d-flex justify-content-center align-items-center"
        >
    <Form className='d-flex align-items-center flex-column'> 
    <h3> Практическое задание по обработчику Калькулятор </h3>
    <p>
        Внимательно изучите таблицу. В ней указаны сумма продаж для каждого бренда. Используя компонент "Калькулятор", рассчитайте долю каждого бренда от общей суммы продаж, в процентах.
        (Общую сумма рассчитывается при помощи статистической функции Stat).
        Итоговую формулу для расчёта впишите в поле ниже. 
    </p>
        <Button className='mb-2 rounded-5' variant={'warning'} 
        //onClick={() =>downloadFile()}
        >Скачать таблицу</Button>
                <Form.Control
                style={{width:300}}
                className='mt-2 rounded-0'
                placeholder='Введите итоговую формулу'
                value={usr_formula}
                onChange={e => setUsrFormula(e.target.value)}
            >
                </Form.Control>
        <Button className='mt-3 mb-2 rounded-5' variant={'outline-success'}
         onClick={() =>checkFormula()}
        >Проверить</Button>
        {
        clicked ? (check ? 
            <p className="text-success"> Правильно! </p>
        : <p className="text-danger"> Неправильно! Попробуйте ещё раз </p> ) 
        : ''
        }
    </Form>
    
        </Container>
    );
    });

export default Excercise1;
