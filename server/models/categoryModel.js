const database = require('sequelize')
const Sequelize = require('sequelize')

const { DataTypes } = database

module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('category', {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    })
    return Category
}