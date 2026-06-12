const transactionRepository = require('../repositories/transaction.repository');

class TransactionService {
  async getAllTransactions(query) {
    const { page = 1, limit = 10, type, search, activityId } = query;
    return await transactionRepository.findAll({ page, limit, type, search, activityId });
  }

  async getTransactionById(id) {
    const transaction = await transactionRepository.findById(id);
    if (!transaction) throw new Error('Transaction not found');
    return transaction;
  }

  async createTransaction(data) {
    return await transactionRepository.create(data);
  }

  async updateTransaction(id, data) {
    const existing = await transactionRepository.findById(id);
    if (!existing) throw new Error('Transaction not found');
    return await transactionRepository.update(id, data);
  }

  async deleteTransaction(id) {
    const existing = await transactionRepository.findById(id);
    if (!existing) throw new Error('Transaction not found');
    await transactionRepository.delete(id);
    return { id };
  }

  async getSummary() {
    return await transactionRepository.getSummary();
  }
}

module.exports = new TransactionService();
