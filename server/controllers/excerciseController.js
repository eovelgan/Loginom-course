const { Excercise } = require("../models/models")
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError')
const XLSX = require('xlsx');

class ExcerciseController {

    

    async getOneFileAsJson (req, res) {
        try {
            const { id } = req.params
             const file = await Excercise.findOne(
                    {
                        where: { id }
                    },
                )
            const fileName=file.fileForCompare;
            const workbook = XLSX.readFile(path.resolve(__dirname,'..','static',fileName));
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(worksheet);
            return res.json(json)
        } catch (error) {
            return res.json(error)
        }
        
    }
 
    async create (req,res,next) {
        try {
            let {name, text, rightAnswer}=req.body
            const {fileForDownload}=req.files
            const {fileForCompare}=req.files
            let excercise
            if (fileForDownload && fileForCompare) {
                let fileForDownloadName = uuid.v4() + ".xlsx"
                fileForDownload.mv(path.resolve(__dirname,'..','static',fileForDownloadName))
                let fileForCompareName = uuid.v4() + ".xlsx"
                fileForCompare.mv(path.resolve(__dirname,'..','static',fileForCompareName))
                excercise = await Excercise.create({name, text, rightAnswer,fileForDownload: fileForDownloadName,fileForCompare:fileForCompareName})
            } 
            else
            {
                if (fileForDownload) {
                    let fileForDownloadName = uuid.v4() + ".xlsx"
                fileForDownload.mv(path.resolve(__dirname,'..','static',fileForDownloadName))
                excercise = await Excercise.create({name, text, rightAnswer,fileForDownload: fileForDownloadName})
                } 
                else {
                    if (fileForCompare) {
                        let fileForCompareName = uuid.v4() + ".xlsx"
                        fileForCompare.mv(path.resolve(__dirname,'..','static',fileForCompareName))
                        excercise = await Excercise.create({name, text, rightAnswer,fileForCompare:fileForCompareName})
                    }
                    else
                    excercise = await Excercise.create({name, text, rightAnswer})
                } 
            }
            
            return res.json(excercise)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
     
    async getAll(req, res) {
        const excercises = await Excercise.findAll()
        return res.json(excercises)
    }

    async getOne(req, res) {
        const { id } = req.params; 
        const excercise = await Excercise.findOne(
                {
                    where: { id }
                }, 
            )
        return res.json(excercise) 
    }

}
module.exports=new ExcerciseController()  