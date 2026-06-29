const express = require('express');
const { getLoginAttempts } = require('../controllers/loginAttempts.controller');

const router = express.Router();

router.get('/', getLoginAttempts);

module.exports = router;