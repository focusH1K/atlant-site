const Sequelize = require("sequelize")
const config = require('./config.js')

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
       logging: config.logging,
       port: config.PORT,
       dialect: config.dialect,
       pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
       } 
    }
)

module.exports = sequelize