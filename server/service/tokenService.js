const jwt = require('jsonwebtoken')
const model = require('../models/model.js')
const config = require('../config.js')

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, config.secret, {expiresIn: '300s'})
        const refreshToken = jwt.sign(payload, config.secret_refresh, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, config.secret)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, config.secret_refresh)
            return userData
        } catch (e) {
            return null
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await model.Session.findOne({where: {userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }

        const token = await model.Session.create({userId, refreshToken})
        return token
    }

    async removeToken(refreshToken) {
        const tokenData = await model.Session.destroy({where: {refreshToken}})
        return tokenData
    }

    async findToken(refreshToken) {
        const tokenData = await model.Session.findOne({where: {refreshToken}})
        return tokenData
    }
}

module.exports = new TokenService()