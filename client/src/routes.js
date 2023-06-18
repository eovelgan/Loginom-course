import Registration from './pages/Auth'
import Start from './pages/Start'
import Cabinet from './pages/Cabinet'
import { CABINET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE, TEST_ROUTE, LECTURE_ROUTE, EXCERCISE_ROUTE } from './utils/consts'
import Lecture from './pages/Lecture'
import Excercise from './pages/Excercise'
import Test from './pages/Test'

//может зайти только пользователь с авторизацией
export const authRoutes = [
    {
        path: CABINET_ROUTE,
        Component: Cabinet
    },
    {
        path: TEST_ROUTE,
        Component: Test
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
