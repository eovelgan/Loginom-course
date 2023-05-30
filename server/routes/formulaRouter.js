const Router = require('express')
const router= new Router ()
const formulaController=require ('../controllers/formulaController')


router.post('/',formulaController.create)
router.get('/:id',formulaController.getOneFormula)
module.exports=router