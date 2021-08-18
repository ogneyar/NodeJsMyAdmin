// const ApiError = require('../error/apiError')/
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const {User, Basket} = require('../models/models')


class AuthController {
    async auth(req, res, next) {
        // const {email, password, role} = req.body
        // if (!email || !password) {
        //     return next(ApiError.badRequest('Некорректный email или пароль'))
        // }
        // const candidate = await User.findOne({where:{email}})
        // if (candidate) {
        //     return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        // }
        // const hashPassword = await bcrypt.hash(password, 5)
        // const user = await User.create({email, role, password: hashPassword})
        // const basket = await Basket.create({userId: user.id})
        // const token = generateJwt(user.id, user.email, user.role)
        // return res.json({token})

        return res.redirect('/start')
    }
}

module.exports = new AuthController()