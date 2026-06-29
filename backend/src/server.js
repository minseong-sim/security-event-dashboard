const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./db/pool');
const authRoutes = require('./routes/auth.routes');

const loginAttemptsRoutes = require('./routes/loginAttempts.routes');
const alertsRoutes = require('./routes/alerts.routes');
const dashboardRoutes = require('./routes/dashboard.routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/login-attempts', loginAttemptsRoutes);
app.use('/api/security-alerts', alertsRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('select current_database(), current_timestamp');
    res.json({
      status: 'ok',
      database: result.rows[0].current_database,
      time: result.rows[0].current_timestamp,
    });
  } catch (err) {
    console.error('Database connection error:', err.message);
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
    });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});