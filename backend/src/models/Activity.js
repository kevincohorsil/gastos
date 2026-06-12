const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('ACTIVO', 'FINALIZADO'),
    defaultValue: 'ACTIVO',
  },
  profitPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    defaultValue: 0,
  }
}, {
  tableName: 'activities',
  timestamps: true,
});

module.exports = Activity;
