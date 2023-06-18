const Router = require('express')
const router= new Router ()
const answerController=require ('../controllers/answerController')
const authMiddleware = require('../middleware/authMiddleware')
router.post('/', answerController.create)
router.get('/',authMiddleware,answerController.getAll)
router.get('/:id',answerController.getOne)
module.exports=router