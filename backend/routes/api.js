const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.post('/generate-log', logController.generateLog);
router.post('/humanize', logController.humanizeLog);
router.post('/ai-score', logController.calculateAiScore);

module.exports = router;
