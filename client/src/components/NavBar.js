import React, { useContext, useState, useTransition } from 'react'
import { Context } from "../index";
import { Button, Card, Container, Form, Offcanvas, ListGroup, Dropdown, DropdownButton, NavDropdown, Image, Accordion } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, CABINET_ROUTE, LECTURE_ROUTE, EXCERCISE_ROUTE, START_ROUTE, TEST_ROUTE } from "../utils/consts";
import { observer } from 'mobx-react-lite'

const NavBar = observer(() => {

  const { user } = useContext(Context)
  const history = useNavigate()
  const logOut = () => {
    user.setUser({})
    user.setIsAuth(false)
  }

  const startLecture = () => {
    history(LECTURE_ROUTE + '/1')
  }
  const interfaceLecture = () => {
    history(LECTURE_ROUTE + '/2')
  }
  const filtationLecture = () => {
    history(LECTURE_ROUTE + '/3')
  }
  const unionLecture = () => {
    history(LECTURE_ROUTE + '/4')
  }
  const groupingLecture = () => {
    history(LECTURE_ROUTE + '/5')
  }
  const calculatorLecture = () => {
    history(LECTURE_ROUTE + '/6')
  }
  const dublicateLecture = () => {
    history(LECTURE_ROUTE + '/7')
  }
  const calculatorExcercise = () => {
    history(EXCERCISE_ROUTE + '/1')
  }
  const dublicateExcercise = () => {
    history(EXCERCISE_ROUTE + '/2')
  }

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container style={{ maxWidth: 1700 }} fluid>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <NavLink style={{ color: 'black' }} to={START_ROUTE} className="position-absolute start-1 ms-5 ps-4"  >
              <Image width={200} height='auto'
                src='../logo.png' />
            </NavLink>
            {user.isAuth ?
              <Nav className="d-flex flex-row">
                <Button
                  className="me-2 rounded-5"
                  variant={"outline-dark"}
                  onClick={() => history(CABINET_ROUTE)}>
                  Личный кабинет
                </Button>
                <Button
                  className="rounded-5"
                  variant={"outline-dark"}
                  onClick={() => logOut()}
                >
                  Выйти
                </Button>
              </Nav>
              :
              <Nav className="d-flex flex-row">
                <Button
                  className="rounded-5"
                  variant={"outline-dark"}
                  onClick={() => history(LOGIN_ROUTE)}>Авторизация</Button>
              </Nav>
            }
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="start"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}
                  className="fw-bold">
                  Навигация по курсу
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>


              <Accordion defaultActiveKey="2" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Основные сведения о Loginom</Accordion.Header>
                <Accordion.Body>
                <ListGroup variant="flush" >
                        <ListGroup.Item action onClick={() => startLecture()}  >Начало работы</ListGroup.Item>
                        <ListGroup.Item action onClick={() => interfaceLecture()}>Интерфейс</ListGroup.Item>
                      </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Обработка данных</Accordion.Header>
                <Accordion.Body>
                <ListGroup variant="flush" >
                        <ListGroup.Item action onClick={() => filtationLecture()}  >Фильтрация данных</ListGroup.Item>
                        <ListGroup.Item action onClick={() => unionLecture()}>Объединение таблиц</ListGroup.Item>
                        <ListGroup.Item action onClick={() => groupingLecture()}>Группировка таблиц</ListGroup.Item>
                        <ListGroup.Item action onClick={() => calculatorLecture()}>Калькулятор</ListGroup.Item>
                        <ListGroup.Item className='ps-5' action onClick={() => calculatorExcercise()}>Практическое задание</ListGroup.Item>
                        <ListGroup.Item action onClick={() => dublicateLecture()}>Дубликаты и противоречия</ListGroup.Item>
                        <ListGroup.Item className='ps-5' action onClick={() => dublicateExcercise()}>Практическое задание</ListGroup.Item>
                      </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
              <ListGroup variant="flush" >
                  <ListGroup.Item 
                  style={{ height: '50px'}}
                  action onClick={() => history(TEST_ROUTE) } >Итоговое тестирование</ListGroup.Item>
              </ListGroup>
              </Accordion.Item>
            </Accordion>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>

  );
});

export default NavBar;