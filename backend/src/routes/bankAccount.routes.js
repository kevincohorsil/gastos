const express = require('express');
const bankAccountController = require('../controllers/bankAccount.controller');

const router = express.Router();

router.get('/balances', bankAccountController.getBalances);
router.get('/', bankAccountController.getAll);
router.get('/:id', bankAccountController.getById);
router.post('/', bankAccountController.create);
router.put('/:id', bankAccountController.update);
router.delete('/:id', bankAccountController.delete);

module.exports = router;
