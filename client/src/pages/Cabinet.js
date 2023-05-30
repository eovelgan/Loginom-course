import React, { useContext, useState, useTransition } from 'react'
import {Button, Card, Container, Form, Row} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'

const Cabinet = observer(() => {

  return (
    <Container className="d-flex justify-content-center align-items-center"
    >
Личный кабинет
    </Container>
  );
});

export default Cabinet;
