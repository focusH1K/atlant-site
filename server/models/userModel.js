const database = require('sequelize')
const Sequelize = require('sequelize')

const { DataTypes } = database

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('user', {
        first_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        is_activated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        activation_link: {
            type: DataTypes.STRING
        },
        reset_link: {
            type: DataTypes.STRING
        },
        is_reseting: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        role: {
            type: DataTypes.ENUM('user', 'admin'),
            defaultValue: 'user'
        },
        passport_data: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    return User
}