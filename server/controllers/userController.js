const ApiError = require('../error/ApiError')
const { query } = require("../db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Lecture, Excercise, User_Lecture, User_Excercise } = require('../models/models')

const generateJwt = (id, email) => {
    return jwt.sign(
        { id, email },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {

    async registration(req, res, next) {
        const { email, password, firstname, lastname, surname } = req.body

        if (password.length  < 4) {
            return next(ApiError.badRequest('Длина пароля должна быть от 4 символов!'))
        }

        if (!email || !password || !firstname || !lastname) {
            return next(ApiError.badRequest('Все обязательные поля должны быть заполнены!'))
        }

        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, firstname, lastname, surname, password: hashPassword })
        const token = generateJwt(user.id, user.email)
        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal('Пользователь с таким именем не найден'))
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }

        const token = generateJwt(user.id, user.email)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({ token })
    }

    async getLectureProgress(req, res) {
        const { id } = req.params;
        
        if (!id || id === 'undefined') return res.json([]);

        const user = await User.findOne(
            {
                where: { id },
                include: Lecture
            },
        )

        return res.json(user?.lectures ? user.lectures : [])
    }

    async getUser(req, res) {
        const { id } = req.params;

        const user = await User.findOne(
            {
                where: { id },
            }
        )
        
        return res.json(user)
    }

    async addLectureProgress(req, res, next) {
        try {
            console.log('addLectureProgress', req.params)
            const { id, lectureId } = req.params;
            console.log('addLectureProgress', id, lectureId)
            const existing = await User_Lecture.findOne(
                {
                    where: {
                        userId: id,
                        lectureId: lectureId
                    }
                }
            )
            console.log('existing', existing)
            if (existing) {
                return res.json(existing);
            }

            const ul = await User_Lecture.create(
                {
                    userId: id,
                    lectureId: lectureId
                },
            )

            return res.json(ul)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }

    async getExcerciseProgress(req, res) {
        const { id } = req.params;
        
        if (!id || id === 'undefined') return res.json([]);

        const user = await User.findOne(
            {
                where: { id },
                include: Excercise
            },
        )

        return res.json(user?.excercises ? user.excercises : [])
    }

    async addExcerciseProgress(req, res, next) {
        try {

            const { id, excerciseId } = req.params;

            const existing = await User_Excercise.findOne(
                {
                    where: {
                        userId: id,
                        excerciseId: excerciseId
                    }
                }
            )

            if (existing) {
                return res.json(existing);
            }

            const ue = await User_Excercise.create(
                {
                    userId: id,
                    excerciseId: excerciseId
                },
            )

            return res.json(ue)
        } catch (e) {
            console.log(e)
            return next(ApiError.badRequest(e))
        }
    }
}

module.exports = new UserController()