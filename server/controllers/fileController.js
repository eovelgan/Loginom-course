const uuid = require('uuid')
const path = require('path')
const { File } = require('../models/models')
const ApiError = require('../error/ApiError')
const XLSX = require('xlsx');
class FileController {


    async getOneFileAsJson (req, res) {
            const { id } = req.params
            const file = await File.findOne(
                {
                    where: { id }
                },
            )
            const fileName=file.file;
        const workbook = XLSX.readFile(path.resolve(__dirname,'..','static',fileName));
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);
        return res.json(json)
        }

    async create(req, res, next) {
        try {
            let { name } = req.body
            const { file } = req.files
            let fileName = uuid.v4() + ".xlsx"
            file.mv(path.resolve(__dirname, '..', 'static', fileName))
            const table = await File.create({ name, file: fileName })
            return res.json(table)
        }
        catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getOneFile(req, res) {
        const { id } = req.params
        const file = await File.findOne(
            {
                where: { id }
            },
        )
        return res.json(file)
    }
}

module.exports = new FileController()