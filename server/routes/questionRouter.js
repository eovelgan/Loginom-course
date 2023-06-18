const Router = require('express')
const router= new Router ()
const questionController=require ('../controllers/questionController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/', questionController.create)
router.get('/',authMiddleware,questionController.getAll)
router.get('/:id',questionController.getOne)
module.exports=router