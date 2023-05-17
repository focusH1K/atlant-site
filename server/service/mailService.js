const nodemailer = require('nodemailer')
const config = require('../config.js')
const userService = require('./userService.js')

class MailService {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: config.smtp_host,
            port: config.smtp_port,
            secure: false,
            auth: {
                user: config.smtp_user,
                pass: config.smtp_password
            }
        })
    }
    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: config.smtp_user,
            to,
            subject: 'Активация акканута на ' + config.api_url,
            text: '',
            html:
                `
                    <div>
                        <h1>Для активации пройдите по ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `
        })
    }

    async sendBookingMail(to, user, flat, checkInDate, checkOutDate) {

        await this.transporter.sendMail({
            from: config.smtp_user,
            to,
            subject: 'Бронирование квартиры',
            text: '',
            html:
                `
                    <div>
                        <p>Уважаемый(ая) ${user.first_name} ${user.last_name},</p>
                        <p>Вы успешно забронировали квартиру:</p>
                        <p><b>${flat.name} ${flat.area} кв.м</b></p>
                        <p>Дата заезда: <b>${checkInDate}</b></p>
                        <p>Дата выезда: <b>${checkOutDate}</b></p>
                    </div>
                `
        })
    }

    async sendResetPasswordMail(to, link) {
        await this.transporter.sendMail({
            from: config.smtp_user,
            to,
            subject: 'Сброс пароля на ' + config.api_url,
            text: '',
            html: `
                <div>
                    <h1>Сброс пароля на ${config.api_url}</h1>
                    <p>Вы получили это письмо, потому что запросили сброс пароля на ${config.api_url}. Если вы не запрашивали сброс пароля, обратитесь в подержку нашего сайта</p>
                    <p>Перед тем, как ввести новый пароль, пожалуйста, сбросьте старый пароль, перейдя по ссылке ниже:</p>
                    <a href="${link}">${link}</a>
                </div>
            `
        });
    }

    async sendPurchaseFlat(to, user,flat, purchase_date) {
        await this.transporter.sendMail({
            from: config.smtp_user,
            to,
            subject: 'Заявка на покупку квартиры',
            text: '',
            html: `
                <div>
                    <h1>Уважаемый ${user.first_name} ${user.las_name}</h1>
                    <p>Вы оставили заявку на покупку квартиры</p>
                    <p><b>${flat.name} ${flat.area} кв.м</b></p>
                    <p>Цена: ${flat.price} руб.</p>
                    <p>Дата отправки заявкм: ${purchase_date}</p>
                    <p>В течение дня с вами свяжется наш менеджер для уточнения всех деталей</p>
                </div>
            `
        })
    }

    async sendUsername(to, user) {
        await this.transporter.sendMail({
            from: config.smtp_user,
            to,
            subject: 'Никнейм пользователя на сайте "ЖК Атлант"',
            text: '',
            html: `
                <div>
                    <h1>Ваш никнейм: ${user.username}</h1>
                </div>
            `
        })
    }
}

module.exports = new MailService()