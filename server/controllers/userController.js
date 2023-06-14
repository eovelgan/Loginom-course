const ApiError = require('../error/ApiError')
const { query } = require("../db")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, Basket, Lecture, Excercise, User_Lecture, User_Excercise } = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UserController {

    async registration(req, res, next) {
        const { email, password, firstname, lastname, surname, role } = req.body
        if (!email || !password || !firstname || !lastname || !surname) {
            return next(ApiError.badRequest('Все поля должны быть заполнены!'))
        }

        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, firstname, lastname, surname, password: hashPassword })
        //  const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
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

        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
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

    async addLectureProgress(req, res, next) {
        try {
            const { id, lectureId } = req.params;

            const existing = await User_Lecture.findOne({
                userId: id,
                lectureId: lectureId
            })

            if (existing) {
                return existing;
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

            const existing = await User_Excercise.findOne({
                userId: id,
                excerciseId: excerciseId
            })

            if (existing) {
                return existing;
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