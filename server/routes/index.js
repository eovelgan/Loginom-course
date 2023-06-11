const Router = require('express')

const router = new Router()
const userRouter = require('./userRouter')
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')
const resultRouter = require('./resultRouter')
const fileRouter = require('./fileRouter')
const lectureRouter = require('./lectureRouter')
const excerciseRouter = require('./excerciseRouter')
const userLectureRouter = require('./userLectureRouter')

router.use('/user', userRouter)
router.use('/test', questionRouter)
router.use('/file', fileRouter)
router.use('/answer', answerRouter)
router.use('/excercise', excerciseRouter)
router.use('/result', resultRouter)
router.use('/lecture', lectureRouter)
router.use('/user_lecture', userLectureRouter)

module.exports = router  