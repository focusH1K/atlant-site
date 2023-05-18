const model = require('../models/model.js')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const mailService = require('./mailService.js')
const tokenService = require('./tokenService.js')
const UserDto = require('../dtos/userDto.js')
const config = require('../config.js')
const ApiError = require('../exeptions/apiError.js')

class UserService {
    async signup(username, email, password, role) {
        const candidateUsername = await model.User.findOne({where: {username}})
        if (candidateUsername) {
            throw ApiError.BadRequest(`Пользователь с ником ${username} уже сущесвтует`)
        }

        const candidateEmail = await model.User.findOne({where: {email}})
        if (candidateEmail) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже сущесвтует`)
        }

        const hashPassword = await bcrypt.hash(password, 8)
        const activation_link = uuid.v4() 

        const user = await model.User.create({username, email, password: hashPassword, activation_link, role, is_activated: false})
        await mailService.sendActivationMail(email, `${config.api_url}/api/activate/${activation_link}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto,
        }
    }

    async activate(activation_link) {
        const user = await model.User.findOne({where: {activation_link}})
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации')
        }
        user.is_activated = true
        await user.save()
    }

    async login(username, password) {
        const user = await model.User.findOne({where: {username}})
        if (!user) {
            throw ApiError.BadRequest('Неверный логин или пароль')
        }
        if (user.is_activated === false) {
            throw ApiError.BadRequest('Пользователь не активирован')
        } 
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный логин или пароль')
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken)
        return token
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFronDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFronDb) {
            throw ApiError.UnauthorizedError()
        }
        const user = await model.User.findByPk(userData.id)
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await model.User.findAll()
        return users
    }
}

module.exports = new UserService()