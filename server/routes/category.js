const authMiddleware = require('../middleware/authMiddleware.js')
const Router = require('express').Router
const adminMiddleware = require('../middleware/adminMiddleware.js')
const CategoryController = require('../controllers/categoryController.js')

const router = new Router()

router.post('/admin/create', adminMiddleware('admin'), CategoryController.create)
router.get('/getall', CategoryController.getAll)

module.exports = router