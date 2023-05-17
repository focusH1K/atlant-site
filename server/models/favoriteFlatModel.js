const database = require('sequelize')
const Sequelize = require('sequelize')

const { DataTypes } = database

module.exports = (sequelize, Sequelize) => {
    const FavoriteFlat = sequelize.define('favorites_flat', {
        flat_id: {
            type: DataTypes.INTEGER, 
            allowNull: true, 
            references: {
                model: 'flats',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    })
    return FavoriteFlat
}