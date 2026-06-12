const bankAccountRepository = require('../repositories/bankAccount.repository');

class BankAccountService {
  async getAllBankAccounts() {
    return await bankAccountRepository.findAll();
  }

  async getBankAccountById(id) {
    const account = await bankAccountRepository.findById(id);
    if (!account) throw new Error('Bank Account not found');
    return account;
  }

  async createBankAccount(data) {
    return await bankAccountRepository.create(data);
  }

  async updateBankAccount(id, data) {
    return await bankAccountRepository.update(id, data);
  }

  async deleteBankAccount(id) {
    await bankAccountRepository.delete(id);
    return { id };
  }

  async getBalances() {
    return await bankAccountRepository.getBalances();
  }
}

module.exports = new BankAccountService();
