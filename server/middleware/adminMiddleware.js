const ApiError = require('../exeptions/apiError.js')
const tokenService = require('../service/tokenService.js')
const model = require('../models/model.js')
const UserDto = require('../dtos/userDto.js')

module.exports = function (requiredRole) {
    return async function (req, res, next) {
        try {
            const authorizationHeader = req.headers.authorization
            if (!authorizationHeader) {
                return next(ApiError.UnauthorizedError())
            }

            const accessToken = authorizationHeader.split(' ')[1]
            if (!accessToken) {
                return next(ApiError.UnauthorizedError())
            }

            const userData = tokenService.validateAccessToken(accessToken)
            if (!userData) {
                return next(ApiError.UnauthorizedError())
            }

            if (requiredRole && userData.role !== requiredRole) {
                return res.status(403).send('У вас нет прав доступа')
            }

            req.user = userData
            next()
        } catch (e) {
            return next(ApiError.UnauthorizedError())
        }
    }
}