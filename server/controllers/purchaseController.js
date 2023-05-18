const model = require('../models/model.js')
const ApiError = require('../exeptions/apiError.js')
const mailService = require('../service/mailService.js')

class PurchaseController {
    async createPurchase (req, res, next) {
        const { userId, flatId, first_name, last_name } = req.body
        const flat = await model.Flat.findOne({ where: { id: flatId } })

        if (!flat) {
            throw new Error('Квартира не найдена')
        }

        const user = await model.User.findOne({ where: { id: userId } })

        if (!user) {
            throw new Error('Пользователь не найден')
        }

        if (flat.status === 'not available') {
            throw new Error('Квартира уже продана')
        }

        const purchase_date = new Date()

        const purchase = await model.PurchaseHistory.create({
            price: flat.price,
            purchase_date: purchase_date,
            flatId: flatId,
            userId: userId
        })

        const updateFlat = await flat.update({
            status: 'not available',
            buyer_id: userId
        })

        await user.update({ first_name: first_name, last_name: last_name })

        await mailService.sendPurchaseFlat(user.email, user, flat, purchase_date)

        res.json({
            purchase,
            updateFlat,
            user
        })
    }

    async getAllPurchases (req, res, next) {
        try {
            const purchases = await model.PurchaseHistory.findAll()
            const purchasesWithDetails = await Promise.all(
                purchases.map(async (purchase) => {
                    const user = await model.User.findOne({ where: { id: purchase.userId } })
                    const flat = await model.Flat.findOne({ where: { id: purchase.flatId } })
                    return {
                        ...purchase.toJSON(),
                        user: user ? user.toJSON() : null,
                        flat: flat ? flat.toJSON() : null,
                    }
                })
            )
            return res.json(purchasesWithDetails)
        } catch (e) {
            next(ApiError.BadRequest(e.message))
        }
    }

    async getOnePurchase (req, res, next) {
        try {
            const { userId } = req.params
            const user = await model.User.findOne({ where: { id: userId } })
            if (!user) {
                throw new Error('Пользователь не найден')
            }

            const purchases = await model.PurchaseHistory.findAll({ where: { userId: userId } })
            if (!purchases.length) {
                return res.json({ message: 'Пользователь пока ничего не приобретал'})
            }

            const purhcasesWithFlatData = await Promise.all(purchases.map(async (purchase) => {
                const flat = await model.Flat.findOne({ where: { id: purchase.flatId } })
                return {
                    ...purchase.toJSON(),
                    flat: flat ? flat.toJSON() : null,
                }
            }))
            return res.json(purhcasesWithFlatData)
        } catch(e) {
            next(ApiError.BadRequest(e.message))
        }
    }
} 

module.exports = new PurchaseController()