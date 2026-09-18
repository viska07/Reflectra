const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Reflection = sequelize.define('Reflection', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    mood: {
        type: DataTypes.STRING,
        allowNull: true
    },

    ai_result: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: 'reflections',
    timestamps: true
});

// Relasi User → Reflection
User.hasMany(Reflection, {
    foreignKey: 'UserId',
    onDelete: 'CASCADE'
});

Reflection.belongsTo(User, {
    foreignKey: 'UserId'
});

module.exports = Reflection;