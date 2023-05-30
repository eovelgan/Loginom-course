const Router = require('express')
const router= new Router ()
const resultController=require ('../controllers/resultController')

router.post('/', resultController.create)
router.get('/',resultController.getAll)
router.put('/update',resultController.update)
router.get('/count',resultController.countRight)
module.exports=router