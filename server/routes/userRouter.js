const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/getuser/:id', authMiddleware, userController.getUser)
router.get('/:id/lecture-progress', authMiddleware, userController.getLectureProgress)
router.get('/:id/excercise-progress', authMiddleware, userController.getExcerciseProgress)
router.get('/:id/add-lecture-progress/:lectureId', authMiddleware, userController.addLectureProgress)
router.get('/:id/add-excercise-progress/:excerciseId', authMiddleware, userController.addExcerciseProgress)

module.exports = router