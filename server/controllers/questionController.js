const { Question, Answer } = require('../models/models')

class QuestionController {
    async create(req, res) {
        const { name } = req.body
        const question = await Question.create({ name })
        return res.json(question)
    }

    async getAll(req, res) {
        const questions = await Question.findAll()
        return res.json(questions)
    }

    async getOne(req, res) {
        const { id } = req.params
        const question = await Question.findOne(
            {
                where: { id },
                include: [{ model: Answer, as: 'answers' }]
            },
        )
        return res.json(question)
    }
}
module.exports = new QuestionController()
