const { Lecture } = require('../models/models')

class LectureController {
    async create(req, res) {
        const { name, text, prev_id, next_id } = req.body
        const lecture = await Lecture.create({ name, text, prev_id, next_id })
        return res.json(lecture)
    }

    async getAll(req, res) {
        const lectures = await Lecture.findAll()
        return res.json(lectures)
    }
 
    async getOne(req, res) {
        const { id } = req.params;
        let lecture;

        if (id) {
            lecture = await Lecture.findOne(
                {
                    where: { id }
                },
            )
        } else {
            lecture = await Lecture.findOne(
                {
                    where: { prev_id: undefined }
                },
            )
        }
        
        return res.json(lecture)
    }
}

module.exports = new LectureController()  