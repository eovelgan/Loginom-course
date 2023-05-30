import React, { useContext, useState, useTransition } from 'react'
import {Button, Card, Container, Form, Row} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE, START2_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location =useLocation()
    const history =useNavigate()
    const isLogin=location.pathname===LOGIN_ROUTE
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [firstname,setFirstname] = useState('')
    const [lastname,setLastname] = useState('')
    const [surname,setSurname] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email,password)
                console.log(data)
            } else {
                data = await registration(email, password,firstname,lastname,surname)
            }       
            user.setUser(user)
            user.setIsAuth(true)
            history(START2_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

  return (
    <Container className="d-flex justify-content-center align-items-center"
    style={{height:window.innerHeight-200}}>
    <Card style={{width:500}} className="p-5">
        <h2 className="m-auto fw-weight-">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
       
        <Form className="d-flex flex-column">
            <Form.Control
            className='mt-3'
            placeholder='Введите e-mail'
            value={email}
            onChange={e => setEmail(e.target.value)}>
            </Form.Control>
            <Form.Control
            className='mt-3'
            placeholder='Введите пароль'
            value={password}
            onChange={e => setPassword(e.target.value)}
            type = "password">
            </Form.Control>
            
            {!isLogin ? 
                <>
            <Form.Control
            className='mt-3'
            placeholder='Введите фамилию'
            value={firstname}
            onChange={e => setFirstname(e.target.value)}>
            </Form.Control>
            <Form.Control
            className='mt-3'
            placeholder='Введите имя'
            value={lastname}
            onChange={e => setLastname(e.target.value)}>
            </Form.Control>
            <Form.Control
            className='mt-3'
            placeholder='Введите отчество'
            value={surname}
            onChange={e => setSurname(e.target.value)}>
            </Form.Control>
            </>
            : ''} 
                        
            <Row className='d-flex justify-content-center mt-3 pl-3 pr-3'>
                {isLogin ? 
                <div>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйтесь </NavLink> </div>
                :
                <div>Есть аккаунт? <NavLink to={LOGIN_ROUTE}> Войдите </NavLink> </div>
                }   
            <Button style={{width:120}} className="mt-3 rounded-5" variant={"outline-success"}
                onClick={click}>
                {isLogin ? 'Войти' : 'Регистрация'}
            </Button>
            </Row>

        </Form>
    </Card>
    </Container>
  );
});

export default Auth;
