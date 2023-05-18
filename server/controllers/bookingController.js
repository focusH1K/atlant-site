const model = require('../models/model');
const ApiError = require('../exeptions/apiError')
const { Sequelize, Op } = require('sequelize');
const mailService = require('../service/mailService');

class BookingController {
    async bookFlat(req, res, next) {
        try {
            const { userId, flatId, check_in_date, check_out_date, first_name, last_name, passport_data } = req.body
            const flat = await model.Flat.findOne({ where: { id: flatId } })
    
            if (!flat) {
                throw new Error('Квартира не найдена')
            }
    
            const user = await model.User.findOne({ where: { id: userId } })
    
            if (!user) {
                throw new Error('Пользователь не найден')
            }
    
            const existingBooking = await model.Reservation.findOne({
                where: {
                    flatId: flatId,
                    [Sequelize.Op.or]: [
                        {
                            check_in_date: {
                                [Sequelize.Op.between]: [check_in_date, check_out_date]
                            }
                        },
                        {
                            check_out_date: {
                                [Sequelize.Op.between]: [check_in_date, check_out_date]
                            }
                        }
                    ]
                }
            })
    
            if (existingBooking) {
                throw new Error('Квартира уже забронирована на этот период')
            }
    
            const activeUserBooking = await model.Reservation.findOne({
                where: {
                    userId: userId,
                }
            })
    
            if (activeUserBooking) {
                throw new Error('Вы уже забронировали квартиру')
            }

            if (flat.status === 'not available') {
                throw new Error('Квартира уже продана')
            }
    
            const booking = await model.Reservation.create({
                check_in_date: check_in_date,
                check_out_date: check_out_date,
                userId,
                flatId
            })
    
            await user.update({ first_name: first_name, last_name: last_name, passport_data: passport_data })
    
            await flat.update({ status: 'reserved' })
    
            await mailService.sendBookingMail(user.email, user, flat, check_in_date, check_out_date)
    
            return res.json(booking)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async cancelBooking(req, res, next) {
        try {
            const { id } = req.params
            const booking = await model.Reservation.findOne({ where: { id: id } })

            if (!booking) {
                throw new Error('Бронирование не найдено')
            }

            await booking.destroy()

            const flat = await model.Flat.findOne({ where: { id: booking.flatId } })

            if (!flat) {
                throw new Error('Квартира не найдена')
            }

            await flat.update({ status: 'available' })

            return res.json(booking)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getBooking(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await model.User.findOne({ where: { id: userId } });
            if (!user) {
                throw new Error('Пользователь не найден');
            }

            const bookings = await model.Reservation.findAll({ where: { userId: userId } });
            if (!bookings.length) {
                return res.json({ message: 'Пользователь пока ничего не забронировал' });
            }

            const bookingsWithFlatData = await Promise.all(bookings.map(async (booking) => {
                const flat = await model.Flat.findOne({ where: { id: booking.flatId } });
                const bookingInfo = {
                    id: booking.id,
                    userId: user.id,
                    checkInDate: booking.check_in_date,
                    checkOutDate: booking.check_out_date,
                    flatInfo: {
                        flatId: flat.id,
                        name: flat.name,
                        price: flat.price,
                        image: flat.image,
                        area: flat.area
                    },
                };
                return bookingInfo;
            }));

            return res.json(bookingsWithFlatData);
        } catch (e) {
            next(ApiError.BadRequest(e.message));
        }
    }


    async getAll(req, res, next) {
        try {
            const bookings = await model.Reservation.findAll();
            const bookingsWithDetails = await Promise.all(
                bookings.map(async (booking) => {
                    const user = await model.User.findOne({ where: { id: booking.userId } });
                    const flat = await model.Flat.findOne({ where: { id: booking.flatId } });
                    return {
                        ...booking.toJSON(),
                        user: user ? user.toJSON() : null,
                        flat: flat ? flat.toJSON() : null,
                    };
                })
            );
            return res.json(bookingsWithDetails);
        } catch (e) {
            next(ApiError.BadRequest(e.message));
        }
    }
}

module.exports = new BookingController();