const Router = require('express')
const router= new Router ()
const fileController=require ('../controllers/fileController')


router.post('/',fileController.create)
router.get('/:id',fileController.getOneFile)
module.exports=router