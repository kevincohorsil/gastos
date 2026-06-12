const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Transaction = sequelize.define('Transaction', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM('INGRESO', 'GASTO', 'APORTACION', 'RETIRO_SOCIO', 'TRANSFERENCIA'),
    allowNull: false,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientOrSupplier: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  receiptUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  activityId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'activities',
      key: 'id'
    }
  },
  partnerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'partners',
      key: 'id'
    }
  },
  bankAccountId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'bank_accounts',
      key: 'id'
    }
  }
}, {
  tableName: 'transactions',
  timestamps: true,
});

const Activity = require('./Activity');
const Partner = require('./Partner');
const BankAccount = require('./BankAccount');

Activity.hasMany(Transaction, { foreignKey: 'activityId', as: 'transactions' });
Transaction.belongsTo(Activity, { foreignKey: 'activityId', as: 'activity' });

Partner.hasMany(Transaction, { foreignKey: 'partnerId', as: 'transactions' });
Transaction.belongsTo(Partner, { foreignKey: 'partnerId', as: 'partner' });

BankAccount.hasMany(Transaction, { foreignKey: 'bankAccountId', as: 'transactions' });
Transaction.belongsTo(BankAccount, { foreignKey: 'bankAccountId', as: 'bankAccount' });

module.exports = Transaction;
