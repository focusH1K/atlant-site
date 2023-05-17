const database = require('sequelize')
const Sequelize = require('sequelize')

const { DataTypes } = database

module.exports = (sequelize, Sequelize) => {
    const Reservation = sequelize.define('reservation', {
        // дата заезда
        check_in_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        // проверка даты
        check_out_date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        flatId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'flats',
                key: 'id'
            }
        }
    })
    return Reservation
}