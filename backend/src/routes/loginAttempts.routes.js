const express = require('express');
const { getLoginAttempts } = require('../controllers/loginAttempts.controller');
const authenticateToken = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', authenticateToken, getLoginAttempts);

module.exports = router;