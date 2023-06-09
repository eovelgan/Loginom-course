const { Answer } = require('../models/models')

class AnswerController {
    async create(req, res) {
        const { name, correct } = req.body
        const answer = await Answer.create({ name, correct })
        return res.json(answer)
    }

    async getAll(req, res) {
        const answers = await Answer.findAll()
        return res.json(answers)
    }

    async getOne(req, res) {
        const { id } = req.params
        const answer = await Answer.findOne(
            {
                where: { id }
            },
        )
        return res.json(answer)
    }
}

module.exports = new AnswerController()