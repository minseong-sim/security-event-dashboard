const express = require('express');
const { getSecurityAlerts } = require('../controllers/alerts.controller');

const router = express.Router();

router.get('/', getSecurityAlerts);

module.exports = router;