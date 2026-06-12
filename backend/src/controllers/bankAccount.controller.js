const bankAccountService = require('../services/bankAccount.service');

class BankAccountController {
  async getAll(req, res, next) {
    try {
      const result = await bankAccountService.getAllBankAccounts();
      res.status(200).json({ success: true, message: 'Bank Accounts retrieved', data: result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const account = await bankAccountService.getBankAccountById(req.params.id);
      res.status(200).json({ success: true, message: 'Bank Account retrieved', data: account });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const account = await bankAccountService.createBankAccount(req.body);
      res.status(201).json({ success: true, message: 'Bank Account created', data: account });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const account = await bankAccountService.updateBankAccount(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Bank Account updated', data: account });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await bankAccountService.deleteBankAccount(req.params.id);
      res.status(200).json({ success: true, message: 'Bank Account deleted', data: null });
    } catch (error) {
      next(error);
    }
  }

  async getBalances(req, res, next) {
    try {
      const balances = await bankAccountService.getBalances();
      res.status(200).json({ success: true, message: 'Bank balances retrieved', data: balances });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BankAccountController();
