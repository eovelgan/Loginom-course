const {Result}=require('../models/models')
const ApiError=require('../error/ApiError')
class ResultController {
    async create (req,res) {
        const {result,questionId,answerId,userId}=req.body
        const result1=await Result.create({result,questionId,answerId,userId})
        return res.json(result1)
    }
    async getAll (req,res) {
        let {userId}=req.query
        const results = await Result.findAll(
            ({where: {userId}})
        )
        return res.json(results)
    }

    async update (req,res) {
        const {result,userId,questionId,answerId}=req.body
        const results = await Result.update(
            ({result,answerId},{where: {userId,questionId}})
        )
        return res.json(results)
    }
    async countRight (req,res) {
        const {userId}=req.query
        const results = await Result.findAndCountAll(
            ({where: {result: true,userId}})
        )
        return res.json(results.count)
    }
}
module.exports=new ResultController()