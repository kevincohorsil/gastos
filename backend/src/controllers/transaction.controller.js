const transactionService = require('../services/transaction.service');

class TransactionController {
  async getAll(req, res, next) {
    try {
      const result = await transactionService.getAllTransactions(req.query);
      res.status(200).json({ success: true, message: 'Transactions retrieved', data: result });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const transaction = await transactionService.getTransactionById(req.params.id);
      res.status(200).json({ success: true, message: 'Transaction retrieved', data: transaction });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = { ...req.body };
      if (data.activityId === '') data.activityId = null;
      if (data.bankAccountId === '') data.bankAccountId = null;
      if (data.partnerId === '') data.partnerId = null;
      if (req.file) {
        data.receiptUrl = req.file.path;
      }
      const transaction = await transactionService.createTransaction(data);
      res.status(201).json({ success: true, message: 'Transaction created', data: transaction });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = { ...req.body };
      if (data.activityId === '') data.activityId = null;
      if (data.bankAccountId === '') data.bankAccountId = null;
      if (data.partnerId === '') data.partnerId = null;
      if (req.file) {
        data.receiptUrl = req.file.path;
      }
      const transaction = await transactionService.updateTransaction(req.params.id, data);
      res.status(200).json({ success: true, message: 'Transaction updated', data: transaction });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await transactionService.deleteTransaction(req.params.id);
      res.status(200).json({ success: true, message: 'Transaction deleted', data: null });
    } catch (error) {
      next(error);
    }
  }

  async getSummary(req, res, next) {
    try {
      const summary = await transactionService.getSummary();
      res.status(200).json({ success: true, message: 'Summary retrieved', data: summary });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TransactionController();
