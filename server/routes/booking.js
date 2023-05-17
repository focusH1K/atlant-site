const authMiddleware = require('../middleware/authMiddleware.js')
const Router = require('express').Router
const adminMiddleware = require('../middleware/adminMiddleware.js')
const BookingController = require('../controllers/bookingController.js')



const router = new Router()

router.post('/bookflat', BookingController.bookFlat)
router.get('/getbooking/:userId', BookingController.getBooking)
router.get('/admin/getallbookings', /*adminMiddleware('admin'),*/ BookingController.getAll)
router.delete('/cancel/:id', BookingController.cancelBooking) 

module.exports = router