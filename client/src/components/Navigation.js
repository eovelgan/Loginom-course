import React, { useContext, useState, useTransition } from 'react'
import {Button, Card, Container, Form, Row,ListGroup, Dropdown, DropdownButton,ButtonGroup} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE,MAINSVED_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'
import Collapse from 'react-bootstrap/Collapse';
import selectedType from '../course/DeviceStore'

const Navigation = observer(() => {
  const {device} =useContext(Context)
    const history = useNavigate()
    const [open, setOpen] = useState(false);
  return (
/*
<Card style={{width:300}} className="p-3 ms-3">
      <Card.Title className="text-center">Навигация</Card.Title>
      <ListGroup variant="flush">
        <ListGroup.Item action         
        onClick={() => history(MAINSVED_ROUTE)}        
        >Основные сведения о Loginom
        </ListGroup.Item>
        <ListGroup.Item action
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        >Обработка данных 
        
        <Collapse in={open}>
            <ListGroup variant="flush" >
            <ListGroup.Item action>Фильтрация данных</ListGroup.Item>
            <ListGroup.Item action>Объединение таблиц</ListGroup.Item>
            <ListGroup.Item action>Калькулятор</ListGroup.Item>
            <ListGroup.Item action>Подмодели</ListGroup.Item>
            <ListGroup.Item action>Дубликаты и противоречия</ListGroup.Item>
            <ListGroup.Item action>Итоговое тестирование</ListGroup.Item>
            </ListGroup>
        </Collapse>
        </ListGroup.Item>
        <ListGroup.Item action>Визуализация данных</ListGroup.Item>
      </ListGroup>
   </Card>
*/
  <ListGroup>
      {device.types.map(type =>
          <ListGroup.Item
          style={{cursor: 'pointer'}}
          active={type.id === device.selectedType.id}
          onClick={() => device.setSelectedType(type)}
          key={type.id}
      >
          {type.name}
          </ListGroup.Item>
      )}
  </ListGroup>
  );
});

export default Navigation;
