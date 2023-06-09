const Router = require('express')
const router = new Router()
const lectureController = require('../controllers/lectureController')

router.post('/', lectureController.create)
router.get('/', lectureController.getAll)
router.get('/:id', lectureController.getOne)

module.exports = router