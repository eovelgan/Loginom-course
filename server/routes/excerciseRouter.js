const Router = require('express')
const router = new Router()
const excerciseController = require('../controllers/excerciseController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/', excerciseController.create)
router.get('/', excerciseController.getAll)
router.get('/:id',authMiddleware, excerciseController.getOne)
router.post('/:id/check', authMiddleware,excerciseController.check)

module.exports = router