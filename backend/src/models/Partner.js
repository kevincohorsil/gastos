const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Partner = sequelize.define('Partner', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('ACTIVO', 'INACTIVO'),
    defaultValue: 'ACTIVO',
  }
}, {
  tableName: 'partners',
  timestamps: true,
});

module.exports = Partner;
