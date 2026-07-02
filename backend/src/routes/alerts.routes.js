const express = require('express');
const {
  getSecurityAlerts,
  resolveSecurityAlert,
} = require('../controllers/alerts.controller');

const router = express.Router();

router.get('/', getSecurityAlerts);
router.patch('/:id/resolve', resolveSecurityAlert);

module.exports = router;