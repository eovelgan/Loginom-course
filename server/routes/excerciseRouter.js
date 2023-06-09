const Router = require('express')
const router= new Router ()
const excerciseController=require ('../controllers/excerciseController')


router.post('/',excerciseController.create)
router.get('/',excerciseController.getAll)
router.get('/:id',excerciseController.getOne)
router.get('/json/:id',excerciseController.getOneFileAsJson)
module.exports=router