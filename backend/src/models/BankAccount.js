const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const BankAccount = sequelize.define('BankAccount', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accountNumber: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bank: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  initialBalance: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
    defaultValue: 0,
  }
}, {
  tableName: 'bank_accounts',
  timestamps: true,
});

module.exports = BankAccount;
