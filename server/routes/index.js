const authMiddleware = require('../middleware/authMiddleware.js')
const Router = require('express').Router
const userController = require('../controllers/userController.js')
const {body} = require('express-validator')
const adminMiddleware = require('../middleware/adminMiddleware.js')
const flat = require('./flat.js')
const favoriteFlat = require('./favoriteFlat.js')
const category = require('./category.js')
const booking = require('./booking.js')
const purchase = require('./purchase.js')


const router = new Router()

router.use('/favoriteFlat', favoriteFlat)
router.use('/flat', flat)
router.use('/category', category)
router.use('/booking', booking)
router.use('/purchase', purchase)


router.post('/signup', 
    body('email').isEmail(),
    body('password').isLength({min: 8, max: 32}),
    userController.signup
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)

router.get('/admin/users', adminMiddleware('admin'), userController.getUsers)

router.get('/user/:id', userController.getUser)
router.put('/user/refreshPass', userController.refreshPassword)
router.post('/user/reset/request', userController.requestPasswordReset)
router.post('/user/reset/:reset_link', userController.resetPassword)
router.put('/admin/user/refreshrole/:id', adminMiddleware('admin'), userController.refreshRole)
router.get('/user/reset/:reset_link', userController.getResetPasswordPage)
router.delete('/user/delete/:id', userController.deleteUser)
router.put('/user/refreshusername/:id', userController.refreshUsername)
router.post('/user/resetUsername', userController.resetUsername)
router.put('/user/refreshPass', userController.refreshPassword)

module.exports = router