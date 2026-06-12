const { Op } = require('sequelize');
const Transaction = require('../models/Transaction');

class TransactionRepository {
  async findAll({ page = 1, limit = 10, type, search, activityId }) {
    const offset = (page - 1) * limit;
    const where = {};

    if (type) {
      where.type = type;
    }

    if (activityId) {
      where.activityId = activityId;
    }

    if (search) {
      where[Op.or] = [
        { description: { [Op.like]: `%${search}%` } },
        { category: { [Op.like]: `%${search}%` } },
        { clientOrSupplier: { [Op.like]: `%${search}%` } }
      ];
    }

    const { count, rows } = await Transaction.findAndCountAll({
      where,
      order: [['date', 'DESC'], ['createdAt', 'DESC']],
      include: ['activity', 'partner', 'bankAccount'],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    return {
      transactions: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit)
      }
    };
  }

  async findById(id) {
    return await Transaction.findByPk(id, {
      include: ['activity', 'partner', 'bankAccount']
    });
  }

  async create(data) {
    const transaction = await Transaction.create(data);
    return await this.findById(transaction.id);
  }

  async update(id, data) {
    await Transaction.update(data, { where: { id } });
    return await this.findById(id);
  }

  async delete(id) {
    return await Transaction.destroy({ where: { id } });
  }

  async findAllRaw() {
    return await Transaction.findAll({
      order: [['date', 'DESC']],
      include: ['activity', 'partner', 'bankAccount']
    });
  }

  async getSummary() {
    const transactions = await Transaction.findAll();
    const summary = {
      totalIngresos: 0,
      totalGastos: 0,
      totalAportaciones: 0,
      totalRetirosSocios: 0,
      balance: 0
    };

    transactions.forEach(t => {
      const amount = parseFloat(t.amount);
      if (t.type === 'INGRESO') {
        summary.totalIngresos += amount;
      } else if (t.type === 'GASTO') {
        summary.totalGastos += amount;
      } else if (t.type === 'APORTACION') {
        summary.totalAportaciones += amount;
      } else if (t.type === 'RETIRO_SOCIO') {
        summary.totalRetirosSocios += amount;
      }
    });

    // Balance = Ingresos operativos - Gastos operativos
    summary.balance = summary.totalIngresos - summary.totalGastos;
    return summary;
  }
}

module.exports = new TransactionRepository();
