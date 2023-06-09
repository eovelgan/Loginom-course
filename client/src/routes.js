import Registration from './pages/Auth'
import Start from './pages/Start'
import Start2 from './pages/Start2'
import Cabinet from './pages/Cabinet'
import { CABINET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE, START2_ROUTE, EXAMPLETEST_ROUTE, LECTURE_ROUTE, EXCERCISE_ROUTE } from './utils/consts'
import EXAMPLETEST from './pages/EXAMPLETEST'
import Lecture from './pages/Lecture'
import Excercise from './pages/Excercise'

//может зайти только пользователь с авторизацией
export const authRoutes = [
    {
        path: CABINET_ROUTE,
        Component: Cabinet
    },
    {
        path: START2_ROUTE,
        Component: Start2
    },
    {
        path: EXAMPLETEST_ROUTE,
        Component: EXAMPLETEST
    },
    {
        path: LECTURE_ROUTE + '/:id',
        Component: Lecture
    },
    {
        path: EXCERCISE_ROUTE + '/:id',
        Component: Excercise
    }
]

//может зайти любой пользователь
export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Registration
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Registration
    },
    {
        path: START_ROUTE,
        Component: Start
    }
]
