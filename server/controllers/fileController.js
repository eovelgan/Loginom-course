const uuid=require ('uuid')
const path=require('path')
const {File}=require('../models/models')
const ApiError=require('../error/ApiError')
class FileController {
    async create (req,res,next) {
        try {
            let {name}=req.body
            const {file}=req.files
            let fileName=uuid.v4()+".xlsx"
            file.mv(path.resolve(__dirname,'..','static',fileName))
            const table = await File.create({name,file: fileName})
            return res.json(table)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOneFile (req,res) {
        const {id} =req.params
        const file = await File.findOne(
            {
            where: {id}
            },
        )
        return res.json(file)
    }


}

module.exports=new FileController()