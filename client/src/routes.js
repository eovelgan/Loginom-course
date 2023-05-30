import Registration from './pages/Auth' 
import Start from './pages/Start'
import Start2 from './pages/Start2'
import Cabinet from './pages/Cabinet'
import Test from './pages/Test'
import { CABINET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, START_ROUTE, START2_ROUTE, TEST_ROUTE, EXCERCISE_ROUTE,EXCERCISE1_ROUTE,EXAMPLETEST_ROUTE, FILTRATION_ROUTE, UNION_ROUTE, CALCULATOR_ROUTE, DUBLICATE_ROUTE, STARTWORKING_ROUTE, INTERFACE_ROUTE, GROUPING_ROUTE } from './utils/consts'
import Excercise from './pages/Excercise'
import Excercise1 from './pages/Excercise1'
import EXAMPLETEST from './pages/EXAMPLETEST'
import LectureStart from './pages/LectureStart'
import LectureFiltration from './pages/LectureFiltration'
import LectureUniontables from './pages/LectureUniontables'
import LectureCalculator from './pages/LectureCalculator'
import LectureDublicates from './pages/LectureDublicates'
import LectureInterface from './pages/LectureInterface'
import LectureGrouping from './pages/LectureGrouping'
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
        path: TEST_ROUTE + '/:id',
        Component: Test
    },
    {
        path: EXCERCISE_ROUTE,
        Component: Excercise
    },
    {
        path: EXCERCISE1_ROUTE,
        Component: Excercise1
    },
    {
        path: EXAMPLETEST_ROUTE,
        Component: EXAMPLETEST
    },
    {
        path: STARTWORKING_ROUTE,
        Component: LectureStart
    },
    {
        path: INTERFACE_ROUTE,
        Component: LectureInterface
    },
    {
        path: FILTRATION_ROUTE,
        Component: LectureFiltration
    },
    {
        path: UNION_ROUTE,
        Component: LectureUniontables
    },
    {
        path: GROUPING_ROUTE,
        Component: LectureGrouping
    },
    {
        path: CALCULATOR_ROUTE,
        Component: LectureCalculator
    },
    {
        path: DUBLICATE_ROUTE,
        Component: LectureDublicates
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
