const express = require('express');
const router = express.Router();
const survivorController = require('../controllers/survivorController');

router.post('/', survivorController.createSurvivor);
router.get('/', survivorController.listSurvivors);
router.get('/:id', survivorController.getSurvivor);
router.post('/request-item', survivorController.requestItems);

module.exports = router;