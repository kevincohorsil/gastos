const BankAccount = require('../models/BankAccount');
const Transaction = require('../models/Transaction');

class BankAccountRepository {
  async findAll() {
    return await BankAccount.findAll({
      order: [['name', 'ASC']]
    });
  }

  async findById(id) {
    return await BankAccount.findByPk(id);
  }

  async create(data) {
    return await BankAccount.create(data);
  }

  async update(id, data) {
    await BankAccount.update(data, { where: { id } });
    return await this.findById(id);
  }

  async delete(id) {
    return await BankAccount.destroy({ where: { id } });
  }

  async getBalances() {
    const accounts = await BankAccount.findAll();
    const transactions = await Transaction.findAll();

    const result = accounts.map(account => {
      const accTxs = transactions.filter(t => t.bankAccountId === account.id);
      
      let balance = parseFloat(account.initialBalance || 0);
      accTxs.forEach(t => {
        const amount = parseFloat(t.amount);
        if (t.type === 'INGRESO' || t.type === 'APORTACION') {
          balance += amount;
        } else if (t.type === 'GASTO' || t.type === 'RETIRO_SOCIO') {
          balance -= amount;
        }
      });

      return {
        ...account.toJSON(),
        currentBalance: balance
      };
    });

    return result;
  }
}

module.exports = new BankAccountRepository();
