const Router = require('express')
const router = new Router()
const lectureController = require('../controllers/lectureController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/', lectureController.create)
router.get('/', lectureController.getAll)
router.get('/:id', authMiddleware,lectureController.getOne)

module.exports = router