import React, { useContext, useState, useTransition } from 'react'
import { Context } from "../index";
import {Button, Card, Container, Form, Offcanvas,ListGroup, Dropdown, DropdownButton,NavDropdown, Image} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { NavLink, useNavigate } from "react-router-dom";
import { START2_ROUTE, LOGIN_ROUTE, CABINET_ROUTE, MAINSVED_ROUTE, TEST_ROUTE, EXCERCISE_ROUTE,EXCERCISE1_ROUTE,EXAMPLETEST_ROUTE, UNION_ROUTE, CALCULATOR_ROUTE, DUBLICATE_ROUTE, FILTRATION_ROUTE, STARTWORKING_ROUTE, INTERFACE_ROUTE, GROUPING_ROUTE } from "../utils/consts";
import {observer} from 'mobx-react-lite'
import Collapse from 'react-bootstrap/Collapse';

const NavBar = observer( () => {
    
    const [open_proc, setOpenProc] = useState(false);
    const [open_start, setOpenStart] = useState(false);

    const {user}=useContext(Context)

    const history = useNavigate()
    
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
<>
{[false].map((expand) => (
  <Navbar key={expand} bg="light" expand={expand} className="mb-3">
    <Container style={{maxWidth:1700}} fluid>
        
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
      <NavLink  style={{color: 'black'}} to={TEST_ROUTE} className="position-absolute start-1 ms-5 ps-4"  >
      <Image width={200} height='auto' 
      src='../logo.png'/>
        </NavLink>
          {user.isAuth ?
                    <Nav className="d-flex flex-row">
                        <Button 
                            className="me-2 rounded-5"
                            variant={"outline-dark"}
                            onClick={() => history(CABINET_ROUTE)}
                        >
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
            <ListGroup.Item action onClick={() => history(STARTWORKING_ROUTE)}  >Начало работы</ListGroup.Item>
            <ListGroup.Item action onClick={() => history(INTERFACE_ROUTE)}>Интерфейс</ListGroup.Item>
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
            <ListGroup.Item action onClick={() => history(FILTRATION_ROUTE)}  >Фильтрация данных</ListGroup.Item>
            <ListGroup.Item action onClick={() => history(UNION_ROUTE)}>Объединение таблиц</ListGroup.Item>
            <ListGroup.Item action onClick={() => history(GROUPING_ROUTE)}>Группировка таблиц</ListGroup.Item>
            <ListGroup.Item action onClick={() => history(CALCULATOR_ROUTE)}>Калькулятор</ListGroup.Item>
            <ListGroup.Item className='ps-5' action onClick={() => history(EXCERCISE1_ROUTE)}>Практическое задание</ListGroup.Item>
            <ListGroup.Item action onClick={() => history(DUBLICATE_ROUTE)}>Дубликаты и противоречия</ListGroup.Item>
            <ListGroup.Item className='ps-5'action onClick={() => history(EXCERCISE_ROUTE)}>Практическое задание</ListGroup.Item>
            
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