const config = require("../config.js")
const model = require("../models/model.js")
const userService = require("../service/userService.js")
const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const ApiError = require('../exeptions/apiError.js')
const uuid = require('uuid')
const mailService = require("../service/mailService.js")

class UserController {
    async signup(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка валидации', errors.array()))
            }
            const { username, email, password, role } = req.body
            const userData = await userService.signup(username, email, password, role)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.status(200).json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const { username, password } = req.body
            const userData = await userService.login(username, password)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(config.client_url)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const { refreshToken } = req.cookies
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true })
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            next(e)
        }
    }

    async getUser(req, res, next) {
        try {
            const { id } = req.params
            const user = await model.User.findOne({ where: { id: id } })
            if (!user) {
                throw new Error('Пользователь не найден')
            }

            return res.json(user)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async refreshPassword(req, res, next) {
        try {
            const { id, password, newPassword } = req.body
            const user = await model.User.findOne({ where: { id: id } })

            if (typeof password === 'undefined' || typeof newPassword === 'undefined') {
                throw new Error('Необходимо указать старый и новый пароли');
            }

            if (!user) {
                throw new Error('Пользователь не найден')
            }

            if (password === newPassword) {
                return res.send('Пароли совпадают')
            }

            const comparePass = await bcrypt.compare(password, user.password)
            if (!comparePass) {
                throw new Error('Старый пароль неверен')
            }

            const hashPass = await bcrypt.hash(newPassword, 8)

            await model.User.update({ password: hashPass }, { where: { id: id } })

            return res.json(user)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async requestPasswordReset(req, res, next) {
        try {
            const { email } = req.body
            const user = await model.User.findOne({ where: { email: email } })
            if (!user) {
                throw new Error('Пользователь не найден')
            }

            const resetLink = uuid.v4()
            user.reset_link = resetLink
            await user.save()

            await mailService.sendResetPasswordMail(email, `${config.client_url}/reset/${resetLink}`)

            return res.send(`Письмо отправлено на почту ${email}`)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getResetPasswordPage(req, res, next) {
        try {
            const { reset_link } = req.params;
            const user = await model.User.findOne({ where: { reset_link: reset_link } });
            if (!user) {
                throw new Error('Неверная ссылка восстановления пароля');
            }
            // Отобразить страницу восстановления пароля
            res.render('reset', { reset_link });
        } catch (e) {
            next(ApiError.BadRequest(e.message));
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { reset_link } = req.params
            const { newPassword, verifyNewPassword } = req.body
            const user = await model.User.findOne({ where: { reset_link: reset_link } })
            if (!user) {
                throw new Error('Неверная ссылка сброса пароля')
            }

            if (newPassword !== verifyNewPassword) {
                throw new Error('Пароли не совпадают')
            }

            if (!user.is_reseting) {
                user.is_reseting = true
                await user.save()
                return res.send('Введите новый пароль')
            }

            const hashPass = await bcrypt.hash(newPassword, 8)
            await model.User.update(
                { password: hashPass, is_reseting: false, reset_link: null },
                { where: { reset_link } }
            )

            return res.json(user)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }

    }

    async refreshRole(req, res, next) {
        try {
            const { id } = req.params
            const { newRole } = req.body

            const user = await model.User.findOne({ where: { id: id } })
            if (!user) {
                throw new Error('Пользователь не найден')
            }

            if (newRole === user.role) {
                return res.send(`У пользователя уже роль ${user.role}`)
            }

            if (newRole !== user.role) {
                await model.User.update({ role: newRole }, { where: { id: id } })
                user.role = newRole
            }

            return res.json(user)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async deleteUser (req, res, next) {
        try {
            const { id } = req.params
            const user = await model.User.findOne({ where: { id: id } })
            if (!user) {
                throw new Error('Пользователь не найден')
            }

            await model.FavoriteFlat.destroy({ where: { userId: id } })
            await model.Session.destroy({ where: { userId: id } })
            await user.destroy()

            return res.json(user)
        } catch(e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async refreshUsername (req, res, next) {
        try {
            const { id } = req.params
            const { newUsername } = req.body
            
            const user = await model.User.findOne({ where: { id: id } })
            if (!user) {
                throw new Error('Пользователь не найден')
            }

            const existingUser = await model.User.findOne({ where: { username: newUsername } })
            if (existingUser) {
                throw new Error(`Никнейм ${newUsername} уже занят`)
            }

            if (newUsername !== user.username) {
                await user.update({ username: newUsername})
                user.username = newUsername 
            }

            
            return res.json(user)
        } catch(e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async resetUsername (req, res, next) {
        try {
            const { email } = req.body
            const user = await model.User.findOne({ where: { email: email } })
            if (!user) {
                throw new Error('Пользователь не найден')
            }

            await mailService.sendUsername(email, user)

            return res.status(200).json({ message: `Письмо отправлено на почту ${email}` })
        } catch(e) {
            next(ApiError.BadRequest(e.message))
        }
    }
}

module.exports = new UserController()