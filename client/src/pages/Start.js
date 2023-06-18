import React, { useContext } from 'react'
import { Container} from 'react-bootstrap';
import { Context } from '..';
import {observer} from 'mobx-react-lite'

const Start = observer(() => {
  const {user}=useContext(Context)
  return (
    <Container className="d-flex justify-content-center align-items-center"
    >
        <div>
        <h2>О Loginom</h2>
            <p>Добро пожаловать в веб-сервис для освоения аналитической платформы Logninom! </p>
            <p>Loginom – это аналитическая low-code платформа, обеспечивающая интеграцию, очистку и анализ данных для принятия более эффективных управленческих решений. </p>
            <p>Здесь вы найдете все необходимое для того, чтобы стать экспертом в этой платформе. Здесь вы найдете разнообразные лекции, практические и тестовые задания, которые помогут закрепить ваши знания. </p>
          {
            user.isAuth ? 
            <p>Спасибо за регистрацию!</p>
           : 
            <p>Для доступа к сервису, пожалуйста, зарегестрируйтесь или войдите в аккаунт.</p>
          }
        </div>
    </Container>
  );
});

export default Start;
