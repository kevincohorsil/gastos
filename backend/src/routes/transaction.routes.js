const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction.controller');
const { validateTransaction } = require('../validations/transaction.validation');
const { upload } = require('../middlewares/upload.middleware');

router.get('/summary', transactionController.getSummary);
router.get('/', transactionController.getAll);
router.get('/:id', transactionController.getById);
router.post('/', upload.single('receipt'), validateTransaction, transactionController.create);
router.put('/:id', upload.single('receipt'), validateTransaction, transactionController.update);
router.delete('/:id', transactionController.delete);

module.exports = router;
