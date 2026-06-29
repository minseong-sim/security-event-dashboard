const pool = require('../db/pool');

const getDashboardSummary = async (req, res) => {
  try {
    const totalResult = await pool.query(
      `select count(*) from login_attempts`
    );

    const successResult = await pool.query(
      `select count(*) from login_attempts where success = true`
    );

    const failedResult = await pool.query(
      `select count(*) from login_attempts where success = false`
    );

    const activeAlertsResult = await pool.query(
      `select count(*) from security_alerts where resolved = false`
    );

    return res.status(200).json({
      totalLoginAttempts: Number(totalResult.rows[0].count),
      successfulAttempts: Number(successResult.rows[0].count),
      failedAttempts: Number(failedResult.rows[0].count),
      activeAlerts: Number(activeAlertsResult.rows[0].count),
    });
  } catch (err) {
    console.error('Get dashboard summary error:', err.message);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getDashboardSummary,
};