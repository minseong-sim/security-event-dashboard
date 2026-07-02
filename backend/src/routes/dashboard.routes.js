const express = require('express');
const { getDashboardSummary } = require('../controllers/dashboard.controller');
const authenticateToken = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/summary', authenticateToken, getDashboardSummary);

module.exports = router;