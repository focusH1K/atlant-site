const database = require('sequelize')
const Sequelize = require('sequelize')

const { DataTypes } = database

module.exports = (sequelize, Sequelize) => {
    const PurchaseHistory = sequelize.define('purchase_history', {
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        purchase_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        flatId: {
            type: DataTypes.INTEGER, 
            allowNull: true, 
            references: {
                model: 'flats',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        },
        userId: {
            type: DataTypes.INTEGER, 
            allowNull: true, 
            references: {
                model: 'users',
                key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
        }
    })
    return PurchaseHistory
}
