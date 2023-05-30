import React, { useContext, useState, useTransition } from 'react'
import {Button, Card, Container, Form, Row, Image} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate } from 'react-router-dom';
import { CALCULATOR_ROUTE, DUBLICATE_ROUTE, FILTRATION_ROUTE, LOGIN_ROUTE, MAINSVED_ROUTE, REGISTRATION_ROUTE, START_ROUTE, UNION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'

const Lecture = observer(() => {


  return (
    <Container className="d-flex justify-content-center align-items-center"
    >

    </Container>
  );
});

export default Lecture;
