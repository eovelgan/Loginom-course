import React, { useContext, useState, useTransition } from 'react'
import {Button, Card, Container, Form, Row, Image, Table, Tab} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate } from 'react-router-dom';
import { CALCULATOR_ROUTE, DUBLICATE_ROUTE, FILTRATION_ROUTE, LOGIN_ROUTE, MAINSVED_ROUTE, REGISTRATION_ROUTE, START_ROUTE, UNION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'

const LectureGrouping = observer(() => {
  const history =useNavigate()

  return (
    <Container className="d-flex justify-content-center align-items-center"
    >
        <div>
        <h1>
        <Image className='me-2'width={45} src="../group-data_default.svg"/>
          Группировка </h1>
        <p>Группировка выполняет действия над набором данных аналогичные действиям SQL-запроса с применением предложения GROUP BY. Компонент позволяет объединять записи избранных полей в группы, а для оставшихся полей вычислять статистические показатели (сумму, среднее, минимум и т.д.). Для каждой группы возвращается одна строка. Статистические показатели (или функции агрегации) при этом вычисляются для каждой группы, а не для всего набора в целом.</p>
        <p>Исходная таблица:</p>
        <Table bordered hover>             
            <thead>
            <tr>
            <th>Дата</th>
            <th>Товар</th>
            <th>Вес, кг</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>12.07.2015</td>
            <td>Яблоки</td>
            <td>20</td>
            </tr>
            <tr>
            <td>12.07.2015</td>
            <td>Яблоки</td>
            <td>18</td>
            </tr>
            <tr>
            <td>12.07.2015</td>
            <td>Помидоры</td>
            <td>24</td>
            </tr>
            <tr>
            <td>13.07.2015</td>
            <td>Помидоры</td>
            <td>22</td>
            </tr>
            <tr>
            <td>13.07.2015</td>
            <td>Груши</td>
            <td>12</td>
            </tr>
            <tr>
            <td>13.07.2015</td>
            <td>Груши</td>
            <td>16</td>
            </tr>
            </tbody>
            </Table>
            <p>В качестве полей-групп выберем поля Дата и Товар, а поле-параметр (по которому будет проводиться агрегация) — Вес, кг. Для примера применим три функции агрегации: сумма, количество записей и среднее.</p>
        <p>Результирующая таблица:</p>
        <Table bordered hover>
            <thead>
            <tr>
            <th>Дата</th>
            <th>Товар</th>
            <th>Вес, кг (Сумма)</th>
            <th>Вес, кг (Количество)</th>
            <th>Вес, кг (Среднее)</th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>12.07.2015</td>
            <td>Помидоры</td>
            <td>24</td>
            <td>1</td>
            <td>24</td>
            </tr>
            <tr>
            <td>12.07.2015</td>
            <td>Яблоки</td>
            <td>38</td>
            <td>2</td>
            <td>19</td>
            </tr>
            <tr>
            <td>13.07.2015</td>
            <td>Груши</td>
            <td>28</td>
            <td>2</td>
            <td>14</td>
            </tr>
            <tr>
            <td>13.07.2015</td>
            <td>Помидоры</td>
            <td>22</td>
            <td>1</td>
            <td>22</td>
            </tr>
            </tbody>
            </Table>
        <p>Как видно из примера, группа образуется уникальным сочетанием значений полей, выбранных в качестве группировочных.</p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
        <h4>Вход</h4>
        <ul>
          <li>
          <Image className= 'me-2' src="../table_inactive.svg"/>
          Входной источник данных — порт для подключения входного набора данных.</li>
        </ul>
        <h4>Выход</h4>
        <ul>
          <li>
          <Image className= 'me-2' src="../table_inactive.svg"/>
          Выходной набор данных — порт отдающий сгруппированную таблицу.
          </li>
        </ul>
        <h3>Мастер настройки </h3>
        <p>Окно мастера поделено на две области.</p>
            <ul>
                <li>Доступные поля — содержит список полей входного набора данных.</li>
                <li>
                Выбранные поля — делится на списки Группа и Показатели.
                <ul>
                    <li>
                    <Image className= 'me-2' src="../group_default.svg"/>
                        Группа — поля группировки.</li>
                    <li>
                    <Image className= 'me-2' src="../value_default.svg"/>
                        Показатели — поля, по которым рассчитываются функции агрегации.</li>
                </ul>
                </li>
            </ul>
        <p>Для настройки требуется переместить поля входного набора в списки Группа или Показатели, перетаскивая их мышью. Так же это можно сделать с помощью кнопок : Переместить в Группу (комбинация горячих клавиш Alt+G) и Переместить в Показатель (комбинация горячих клавиш Alt+S). Над списком доступных полей расположено поле Фильтрация, оно позволяет найти поле по имени или его части.</p>
        <p>Настройка метода агрегации для каждого показателя производится в отдельном окне. Чтобы его открыть, нужно дважды кликнуть по полю в списке Параметры или вызвать это окно из контекстного меню. Далее отметить галочками нужные методы агрегации. Результат для каждого метода будет записан в отдельный столбец.</p>
        <p>В нижней части мастера расположены два параметра отмечаемые чекбоксами:</p>
            <ul>
                <li>Кэшировать значения групп — результирующие данные будет закэшированы для использования последующими узлами;</li>
                <li>Сортировать результирующие данные — данные в результирующей таблице будут отсортированы по полям группировки в зависимости от их последовательности расположения в списке Группы.</li>
            </ul>
      <Container className='d-flex justify-content-end'>
        <Button 
        variant='success'
        className='mb-3 rounded-5'
        onClick={() => history(CALCULATOR_ROUTE)}
        > К следующей лекции</Button>
   </Container>
      </div>
    </Container>
  );
});

export default LectureGrouping;
