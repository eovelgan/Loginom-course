import React, { useContext, useState, useTransition } from 'react'
import {Button, Card, Container, Form, Row, Image} from 'react-bootstrap';
import { NavLink,useLocation, useNavigate } from 'react-router-dom';
import { CALCULATOR_ROUTE, DUBLICATE_ROUTE, EXCERCISE1_ROUTE, FILTRATION_ROUTE, LOGIN_ROUTE, MAINSVED_ROUTE, REGISTRATION_ROUTE, START_ROUTE, UNION_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { Context } from '..';
import {observer} from 'mobx-react-lite'

const LectureCalculator = observer(() => {
  const history =useNavigate()

  return (
    <Container className="d-flex justify-content-center align-items-center"
    >
        <div>
        <h1>
        <Image className='me-2' width={45} src="../calc-data_default.svg"/>
          Калькулятор</h1>
        <p>Создает новые поля, которые вычисляются по заданной формуле из значений переменных, других полей и функций или используя JavaScript код.</p>
        <h4>Вход </h4>
        <ul>
          <li>
          <Image className= 'me-2' src="../table_inactive.svg"/>
            Входной источник данных (таблица данных);</li>
          <li>
          <Image className= 'me-2' src="../variable_inactive.svg"/>
            Входные переменные (переменные), необязательный.</li>
        </ul>
        <h4>Выход </h4>
        <ul>
          <li>
          <Image className= 'me-2' src="../table_inactive.svg"/>
            Выходной набор данных (таблица данных).</li>
        </ul>
        <h3>Мастер настройки </h3>
        <ol>
          <li>Список выражений;</li>
          <li>Область кода выражений;</li>
          <li>Поля/переменные;</li>
          <li>Список функций.</li>
        </ol>
        <h4>Список выражений</h4>
        <p>Область предназначена для ввода Выражений — вычисляемых полей, которыми в результате обработки будет дополнен входной набор данных. Значение выражения в каждой строке набора данных будет вычислено по формуле или JavaScript коду.</p>
        <p>Новое выражение можно создать при помощи панели инструментов области или контекстного меню. Операции панели инструментов и контекстного меню:</p>
        <ul>
          <li>Синтаксис (выпадающий список)— задание синтаксиса расчета выражений калькулятора;</li>
          <li>Редактировать — задание параметров выражения;</li>
          <li>Переместить вверх — поднять выражение на одну позицию вверх по списку;</li>
          <li>Переместить вниз — опустить выражение на одну позицию вниз по списку;</li>
          <li>Добавить выражение — добавляет новое выражение с параметрами по умолчанию;</li>
          <li>Добавить выражение по образцу — добавляет новое выражение с типом данных, описанием и формулой, как у текущего выражения;</li>
          <li>Удалить выражение — удаляет текущее выражение;</li>
          <li>Удалить все выражения — удаляет все имеющиеся выражения.</li>
        </ul>
        <p>При добавлении и редактировании выражения отображается диалог редактирования параметров. Следующие параметры выражений доступны для изменений:</p>
        <ul>
          <li>Имя — вводится имя поля присваемое столбцу в выходном наборе данных;</li>
          <li>Метка — вводится метка поля присваемая столбцу в выходном наборе данных;</li>
          <li>Тип данных — выбирается тип данных поля в выходном наборе данных;</li>
          <li>Промежуточное — при установке этого флага выражение может использоваться в расчетах, не включается в список полей выходного набора данных;</li>
          <li>Кэшировать — сохранение однажды вычисленного значения выражения, целесообразно при неоднократном использовании значений выражения последующими узлами и визуализаторами во избежание выполнения повторных вычислений;</li>
          <li>Описание — поясняющая информация.</li>
        </ul>
        <h4>Область кода выражения </h4>
        <p>В области кода в зависимости от выбранного синтаксиса калькулятора задается формула расчета выражения или JavaScript код. Ссылки на входящие поля/переменные и синтаксические конструкции функций можно вставлять в код выражения, выбрав их двойным кликом мыши в соответствующих областях или перетащив мышкой. Ссылки на созданные в Калькуляторе выражения задаются в области кода ручным вводом имени выражения.</p>
        <p>Изменения в области кода сохраняются при выходе из нее.</p>
        <h4>Поля/переменные </h4>
        <p>Область содержит список Полей и Переменных, передаваемых на вход узла. Перечень и параметры полей/переменных определяются при настройке входных портов узла.</p>
        <p>Двойной клик мыши по позиции списка вводит имя поля/переменной в область кода выражения. То же самое можно сделать при помощи Drag-and-drop.</p>
        <p>Если у Поля/Выражения и Переменной совпадают имена, то используется Поле/Выражение. В таком случае к Переменной можно обращаться только через префикс Var./this.Var. ( Var. используется для синтаксиса Выражение, this.Var. — для синтаксиса в Javascript ).</p>
        <h4>Список функций </h4>
        <p>Наименование, входные аргументы и описание доступных для использования функций.</p>
        <p>Возможна фильтрация по категории и названию функции.</p>
        <p>Двойной клик мыши по позиции выбранной функции вставляет ее синтаксис в область кода выражения. То же самое можно сделать при помощи Drag-and-drop.</p>
        <p>Ссылки на поля/переменные и синтаксические конструкции функций можно вставлять в код выражения, выбрав их двойным кликом мыши в соответствующих областях или перетащив мышкой.</p>
        <h4>Синтаксис калькулятора </h4>
        <p>В калькуляторе существует два способа расчета выражений:</p>
        <ul>
          <li>Выражение;</li>
          <li>JavaScript.</li>
        </ul>

        <p>Для выбора синтаксиса необходимо в меню списка выражений выбрать JavaScript или Выражение (см. рисунок 1).</p>
        <Image className= 'mb-5' src="../readme-1.png"/>
      
        <Container className='d-flex justify-content-end'>
        <Button 
        variant='outline-success'
        className='mb-3 me-3 rounded-5'
        onClick={() => history(EXCERCISE1_ROUTE)}
        > Открыть практическое задание</Button>
        <Button 
        variant='success'
        className='mb-3 rounded-5'
        onClick={() => history(DUBLICATE_ROUTE)}
        > К следующей лекции</Button>
        </Container>
      </div>

    </Container>
  );
});

export default LectureCalculator;
