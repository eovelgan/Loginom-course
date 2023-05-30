const uuid=require ('uuid')
const path=require('path')
const {Formula}=require('../models/models')
const ApiError=require('../error/ApiError')
class FormulaController {
    async create (req,res,next) {
        const {value}=req.body
        const formula=await Formula.create({value})
        return res.json(formula)
    }

    async getOneFormula (req,res) {
        const {id} =req.params
        const file = await Formula.findOne(
            {
            where: {id}
            },
        )
        return res.json(file)
    }
}

module.exports=new FormulaController()