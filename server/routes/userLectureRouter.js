const Router = require('express')
const router = new Router()
const userLectureController = require('../controllers/userLectureController')

router.post('/', userLectureController.create)
router.get('/', userLectureController.getAll)
router.get('/:id', userLectureController.getOne)

module.exports = router