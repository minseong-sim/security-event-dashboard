const express = require('express');
const {
  getSecurityAlerts,
  resolveSecurityAlert,
} = require('../controllers/alerts.controller');
const authenticateToken = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authenticateToken, getSecurityAlerts);
router.patch('/:id/resolve', authenticateToken, resolveSecurityAlert);

module.exports = router;