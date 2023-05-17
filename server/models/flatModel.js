const database = require('sequelize')
const Sequelize = require('sequelize')

const { DataTypes } = database

module.exports = (sequelize, Sequelize) => {
    const Flat = sequelize.define('flat', {
        name: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT, 
            allowNull: false
        },
        image: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER, 
            allowNull: false
        },
        area: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM('available', 'reserved', 'not available'),
            defaultValue: 'available'
        },
        buyer_id: {
            type: DataTypes.INTEGER, 
            allowNull: true, 
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    })
    return Flat
}

