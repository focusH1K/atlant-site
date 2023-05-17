const authMiddleware = require('../middleware/authMiddleware.js')
const Router = require('express').Router
const adminMiddleware = require('../middleware/adminMiddleware.js')
const FlatController = require('../controllers/flatController.js')


const router = new Router()

router.put('/admin/update/:id', adminMiddleware('admin'), FlatController.update)
router.post('/admin/create', adminMiddleware('admin'), FlatController.create)
router.get('/getall', FlatController.getAll)
router.get('/getone/:id', FlatController.getOne)

module.exports = router