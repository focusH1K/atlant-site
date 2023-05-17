const model = require('../models/model.js')
const ApiError = require('../exeptions/apiError.js')

class CategoryController {
    async create(req, res) {
        const { name } = req.body
        const category = await model.Category.create({name})
        return res.json(category)
    }

    async getAll(req, res) {
        const categories = await model.Category.findAll()
        return res.json(categories)
    }
}

module.exports = new CategoryController()