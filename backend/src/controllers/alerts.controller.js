const pool = require('../db/pool');

const getSecurityAlerts = async (req, res) => {
  try {
    const result = await pool.query(
      `select 
         id,
         alert_type,
         message,
         ip_address,
         resolved,
         created_at
       from security_alerts
       order by created_at desc
       limit 50`
    );

    return res.status(200).json({
      securityAlerts: result.rows,
    });
  } catch (err) {
    console.error('Get security alerts error:', err.message);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getSecurityAlerts,
};