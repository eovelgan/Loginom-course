const { User_Lecture } = require('../models/models')

class userLectureController {
    async create(req, res) {
        const { userId, lectureId } = req.body
        const lecture = await User_Lecture.create({ userId, lectureId })
        return res.json(lecture)
    }

    async getAll(req, res) {
        let { userId } = req.query
        const lectures = await User_Lecture.findAll(
            ({ where: { userId } })
        )
        return res.json(lectures)
    }
    async getOne(req, res) {
        const { id } = req.params;
        let user_lecture;
            user_lecture = await User_Lecture.findOne(
                {
                    where: { id }
                },
            )

        return res.json(user_lecture)
    }
}

module.exports = new userLectureController()  