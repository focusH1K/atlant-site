const authMiddleware = require('../middleware/authMiddleware.js')
const Router = require('express').Router
const adminMiddleware = require('../middleware/adminMiddleware.js')
const PurchaseController = require('../controllers/purchaseController.js')



const router = new Router()

router.post('/purchaseflat', PurchaseController.createPurchase) 
router.get('/admin/getallpurchases', PurchaseController.getAllPurchases)
router.get('/getonepurchase/:userId', PurchaseController.getOnePurchase)

module.exports = router