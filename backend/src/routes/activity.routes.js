const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activity.controller');
const { validateActivity } = require('../validations/activity.validation');

router.get('/', activityController.getAll);
router.get('/:id', activityController.getById);
router.post('/', validateActivity, activityController.create);
router.put('/:id', validateActivity, activityController.update);
router.delete('/:id', activityController.delete);

module.exports = router;
