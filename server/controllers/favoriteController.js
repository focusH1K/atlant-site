const model = require('../models/model.js')
const ApiError = require('../exeptions/apiError.js')

class FavoriteFlatController {
    async addToFavorite(req, res, next) {
        try {
            const { userId, flat_id } = req.body
            const user = await model.User.findOne({ where: { id: userId } })
            const flat = await model.Flat.findOne({ where: { id: flat_id } })

            if (!flat) {
                throw new Error('Квартира не существует')
            }

            if (!user) {
                throw new Error('Пользователь не найден')
            }

            let favoriteFlat = await model.FavoriteFlat.findOne({ where: { flat_id, userId } })

            if (favoriteFlat) {
                throw new Error('Квартира уже добавлена в избранное')
            }

            favoriteFlat = await model.FavoriteFlat.create({ userId: user.id, flat_id })

            return res.json(favoriteFlat)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async clearFavorite(req, res, next) {
        try {
            const { userId } = req.params
            const user = await model.User.findOne({ where: { id: userId } })

            if (!user) {
                throw new Error('Пользователь не найден')
            }

            const favoriteFlat = await model.FavoriteFlat.destroy({ where: { userId: user.id } })

            if (!favoriteFlat) {
                throw new Error('Раздел пуст')
            }

            return res.status(200).send('Раздел очищен')
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async deleteOneFlat(req, res, next) {
        try {
            const { flat_id, userId } = req.params
            const user = await model.User.findOne({ where: { id: userId } })

            if (!user) {
                throw new Error('Пользователь не найден')
            }

            const favoriteFlat = await model.FavoriteFlat.findOne({ where: { userId, flat_id } })

            if (!favoriteFlat) {
                throw new Error('Квартиры нет в избранном')
            }

            await model.FavoriteFlat.destroy({ where: { userId, flat_id } })

            return res.status(200).send('Квартира убрана из избранного')
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getFavoriteFlats(req, res, next) {
        try {
            const { userId } = req.params
            const user = await model.User.findOne({ where: { id: userId } })

            if (!user) {
                throw new Error('Пользователь не найден')
            }

            const favoriteFlats = await model.FavoriteFlat.findAll({ where: { userId: user.id } })
            const flats = await Promise.all(favoriteFlats.map(async (favoriteFlat) => {
                const flat = await model.Flat.findOne({ where: { id: favoriteFlat.flat_id } })
                return {
                    ...favoriteFlat.toJSON(),
                    flat: flat ? flat.toJSON() : null
                }
            }))

            if (flats.length === 0) {
                return res.json({ message: 'Раздел пуст' })
            }

            return res.json(flats)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async checkFavoriteStatus(req, res, next) {
        try {
            const { userId, flat_id } = req.params;
            const favorite = await model.FavoriteFlat.findOne({
                where: {
                    userId: userId,
                    flat_id: flat_id
                }
            });
            const isFavorite = !!favorite;
            res.json(isFavorite);
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    };

}

module.exports = new FavoriteFlatController()