import React, { useContext, useState, useTransition } from 'react'
import {Button, Card, Container, Form, Row, Image, Table, Tab} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate } from 'react-router-dom';
import { CALCULATOR_ROUTE, DUBLICATE_ROUTE, EXAMPLETEST_ROUTE, EXCERCISE_ROUTE, FILTRATION_ROUTE, LOGIN_ROUTE, MAINSVED_ROUTE, REGISTRATION_ROUTE, START_ROUTE, UNION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'

const LectureDublicates = observer(() => {
  const history =useNavigate()

  return (
    <Container className="d-flex justify-content-center align-items-center"
    >
        <div>
        <h1>
        <Image className='me-2'width={45} src="../duplicates_default.svg"/>
          Дубликаты и противоречия </h1>
        <p>Компонент позволяет выявить в исходной выборке данных дублирующие и противоречивые записи.</p>
        <p>Дубликаты — записи в таблице, все входные и выходные поля которых одинаковые. Дубликаты приводят к избыточности, увеличивают объем выборки, при этом не повышая информативность данных.</p>
        <p>Противоречия — записи в таблице, у которых все входные поля одинаковые, но отличаются хотя бы по одному выходному полю. Противоречия приводят к искажению результата анализа и снижают качество моделей, поскольку нарушают общие закономерности в данных, обнаружение которых и является целью исследования.</p>
        <p>Алгоритм ищет в наборе данных записи, для которых одинаковым входным полям соответствуют одинаковые (дубликаты) или разные (противоречия) выходные поля.</p>
        <h4>Пример:</h4>
        <p>Исследуем следующий набор данных на дубликаты и противоречия, для этого зададим назначение "Входное" для полей "Поле 1" и "Поле 2", назначение "Выходное" для полей "Поле 3" и "Поле 4" в настройках входного порта.</p>
        <p>Исходная таблица:</p>
        <Table bordered hover>
            <thead>
            <tr>
            <th>Поле 1</th>
            <th>Поле 2</th>
            <th>Поле 3</th>
            <th>Поле 4</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>01.01.2019</td>
            <td>2</td>
            <td>1000</td>
            <td>1500</td>
            </tr>
            <tr>
            <td>21.05.2019</td>
            <td>3</td>
            <td>1000</td>
            <td>1500</td>
            </tr>
            <tr>
            <td>21.05.2019</td>
            <td>3</td>
            <td>700</td>
            <td>1500</td>
            </tr>
            <tr>
            <td>21.05.2019</td>
            <td>3</td>
            <td>700</td>
            <td>1500</td>
            </tr>
            <tr>
            <td>01.09.2019</td>
            <td>4</td>
            <td>1200</td>
            <td>1700</td>
            </tr>
            <tr>
            <td>01.09.2019</td>
            <td>4</td>
            <td>1200</td>
            <td>1700</td>
            </tr>
            </tbody>
        </Table>
        <p>Выходная таблица:</p>
        <Table bordered hover>
            <thead>
            <tr>
            <th>Дубликат</th>
            <th>Группа дубликата</th>
            <th>Противоречие</th>
            <th>Группа противоречия</th>
            <th>Поле 1</th>
            <th>Поле 2</th>
            <th>Поле 3</th>
            <th>Поле 4</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>false</td>
            <td></td>
            <td>false</td>
            <td></td>
            <td>01.01.2019</td>
            <td>2</td>
            <td>1 000</td>
            <td>1 500</td>
            </tr>
            <tr>
            <td>false</td>
            <td></td>
            <td>true</td>
            <td>1</td>
            <td>21.05.2019</td>
            <td>3</td>
            <td>1 000</td>
            <td>1 500</td>
            </tr>
            <tr>
            <td>true</td>
            <td>1</td>
            <td>true</td>
            <td>1</td>
            <td>21.05.2019</td>
            <td>3</td>
            <td>700</td>
            <td>1 500</td>
            </tr>
            <tr>
            <td>true</td>
            <td>1</td>
            <td>true</td>
            <td>1</td>
            <td>21.05.2019</td>
            <td>3</td>
            <td>700</td>
            <td>1 500</td>
            </tr>
            <tr>
            <td>true</td>
            <td>2</td>
            <td>false</td>
            <td></td>
            <td>01.09.2019</td>
            <td>4</td>
            <td>1 200</td>
            <td>1 700</td>
            </tr>
            <tr>
            <td>true</td>
            <td>2</td>
            <td>false</td>
            <td></td>
            <td>01.09.2019</td>
            <td>4</td>
            <td>1 200</td>
            <td>1 700</td>
            </tr>
            </tbody>
        </Table>
        <p>В результате найдены две группы дубликатов и одна группа противоречий.</p>
        <h3>Порты</h3>
        <h4>Вход</h4>
        <ul>
          <li>
          <Image className= 'me-2' src="../table_inactive.svg"/>
            Входной источник данных (таблица данных). В настройках этого порта следует выставить назначение "Входное" и "Выходное" полям, которые будут использоваться для исследования на дубликаты и противоречия.</li>
        </ul>
        <h4>Выход</h4>
        <ul>
          <li>
          <Image className= 'me-2' src="../table_inactive.svg"/>
            Выходной набор данных. Таблица имеет следующую структуру:
            <ul>
              <li>Дубликат — значение логического типа, определяющее является ли исходная строка дубликатом или нет;</li>
              <li>Группа дубликата — в одну группу дубликатов объединяются дубликаты, у которых входные и выходные колонки совпадают;</li>
              <li>Противоречие — значение логического типа, определяющее является ли исходная строка противоречием или нет;</li>
              <li>Группа противоречия — в одну группу противоречий объединяются все противоречия, у которых входные колонки совпадают.</li>
            </ul>
          </li>
        </ul>
        <Container className='d-flex justify-content-end'>
        <Button 
        variant='outline-success'
        className='mb-3 me-3 rounded-5'
        onClick={() => history(EXCERCISE_ROUTE)}
        > Открыть практическое задание</Button>
        <Button 
        variant='success'
        className='mb-3 rounded-5'
        onClick={() => history(EXAMPLETEST_ROUTE)}
        > Перейти к итоговому тестированию</Button>
        </Container>
      </div>
    </Container>
  );
});

export default LectureDublicates;
