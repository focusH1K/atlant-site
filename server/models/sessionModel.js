const database = require('sequelize')
const Sequelize = require('sequelize')

const { DataTypes } = database

module.exports = (sequelize, Sequelize) => {
    const Session = sequelize.define('token', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        refreshToken: {
            type: DataTypes.TEXT
        }
    })
    return Session
}