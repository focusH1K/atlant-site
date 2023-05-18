const Router = require('express').Router
const FavoriteFlatController = require('../controllers/favoriteController.js')



const router = new Router()

router.delete('/deleteFlat/user/:userId/flat/:flat_id', FavoriteFlatController.deleteOneFlat)
router.post('/create', FavoriteFlatController.addToFavorite)
router.delete('/clear/:userId', FavoriteFlatController.clearFavorite)
router.get('/getAllFlats/:userId', FavoriteFlatController.getFavoriteFlats)
router.get('/getstatus/user/:userId/flat/:flat_id', FavoriteFlatController.checkFavoriteStatus)

module.exports = router