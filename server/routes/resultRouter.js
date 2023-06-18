const Router = require('express')
const router= new Router ()
const resultController=require ('../controllers/resultController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware,resultController.create)
router.get('/',authMiddleware,resultController.getAll)
router.put('/update',authMiddleware,resultController.update)
router.get('/count',authMiddleware,resultController.countRight)
module.exports=router