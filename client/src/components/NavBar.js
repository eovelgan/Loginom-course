import React, { useContext, useState, useTransition } from 'react'
import { Context } from "../index";
import { Button, Card, Container, Form, Offcanvas, ListGroup, Dropdown, DropdownButton, NavDropdown, Image } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom";
import { START2_ROUTE, LOGIN_ROUTE, CABINET_ROUTE, EXCERCISE2_ROUTE, EXCERCISE1_ROUTE, EXAMPLETEST_ROUTE, LECTURE_ROUTE, EXCERCISE_ROUTE, START_ROUTE } from "../utils/consts";
import { observer } from 'mobx-react-lite'
import Collapse from 'react-bootstrap/Collapse';

const NavBar = observer(() => {

  const [open_proc, setOpenProc] = useState(false);
  const [open_start, setOpenStart] = useState(false);
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
                <ListGroup variant="flush">
                  <ListGroup.Item action
                    onClick={() => setOpenStart(!open_start)}
                    aria-expanded={open_start}
                    className="fw-bold"
                  >Основные сведения о Loginom
                    <Collapse in={open_start}>
                      <ListGroup variant="flush" >
                        <ListGroup.Item action onClick={() => startLecture()}  >Начало работы</ListGroup.Item>
                        <ListGroup.Item action onClick={() => interfaceLecture()}>Интерфейс</ListGroup.Item>
                      </ListGroup>
                    </Collapse>
                  </ListGroup.Item>
                  <ListGroup.Item action
                    onClick={() => setOpenProc(!open_proc)}
                    aria-expanded={open_proc}
                    className="fw-bold"
                  >Обработка данных
                    <Collapse in={open_proc}>
                      <ListGroup variant="flush" >
                        <ListGroup.Item action onClick={() => filtationLecture()}  >Фильтрация данных</ListGroup.Item>
                        <ListGroup.Item action onClick={() => unionLecture()}>Объединение таблиц</ListGroup.Item>
                        <ListGroup.Item action onClick={() => groupingLecture()}>Группировка таблиц</ListGroup.Item>
                        <ListGroup.Item action onClick={() => calculatorLecture()}>Калькулятор</ListGroup.Item>
                        <ListGroup.Item className='ps-5' action onClick={() => calculatorExcercise()}>Практическое задание</ListGroup.Item>
                        <ListGroup.Item action onClick={() => dublicateLecture()}>Дубликаты и противоречия</ListGroup.Item>
                        <ListGroup.Item className='ps-5' action onClick={() => dublicateExcercise()}>Практическое задание</ListGroup.Item>
                      </ListGroup>
                    </Collapse>
                  </ListGroup.Item>
                  <ListGroup.Item className="fw-bold" action onClick={() => history(EXAMPLETEST_ROUTE)} >Итоговое тестирование</ListGroup.Item>
                </ListGroup>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>

  );
});

export default NavBar;