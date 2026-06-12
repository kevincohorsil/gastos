const express = require('express');
const partnerController = require('../controllers/partner.controller');

const router = express.Router();

router.get('/contributions', partnerController.getContributions);
router.get('/', partnerController.getAll);
router.get('/:id', partnerController.getById);
router.post('/', partnerController.create);
router.put('/:id', partnerController.update);
router.delete('/:id', partnerController.delete);

module.exports = router;
