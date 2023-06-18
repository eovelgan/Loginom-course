const Router = require('express')

const router = new Router()
const userRouter = require('./userRouter')
const questionRouter = require('./questionRouter')
const answerRouter = require('./answerRouter')
const resultRouter = require('./resultRouter')
const lectureRouter = require('./lectureRouter')
const excerciseRouter = require('./excerciseRouter')

router.use('/user', userRouter)
router.use('/test', questionRouter)
router.use('/answer', answerRouter)
router.use('/excercise', excerciseRouter)
router.use('/result', resultRouter)
router.use('/lecture', lectureRouter)

module.exports = router