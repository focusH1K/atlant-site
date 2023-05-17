const sequelize = require('../sequelize.js')
const Sequelize = require('sequelize')

const model = {}
model.Sequelize = Sequelize
model.sequelize = sequelize

model.User = require('./userModel.js')(sequelize, Sequelize)
model.Flat = require('./flatModel.js')(sequelize, Sequelize)
model.Session = require('./sessionModel.js')(sequelize, Sequelize)
model.Reservation = require('./reservationModel.js')(sequelize, Sequelize)
model.PurchaseHistory = require('./purchaseHistoryModel.js')(sequelize, Sequelize)
model.Category = require('./categoryModel.js')(sequelize, Sequelize)
model.FavoriteFlat = require('./favoriteFlatModel.js')(sequelize, Sequelize)


model.User.hasMany(model.FavoriteFlat)
model.FavoriteFlat.belongsTo(model.User)

module.exports = model