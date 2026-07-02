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

const resolveSecurityAlert = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `update security_alerts
       set resolved = true
       where id = $1
       returning id, alert_type, message, ip_address, resolved, created_at`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: 'Security alert not found',
      });
    }

    return res.status(200).json({
      message: 'Security alert resolved successfully',
      securityAlert: result.rows[0],
    });
  } catch (err) {
    console.error('Resolve security alert error:', err.message);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getSecurityAlerts,
  resolveSecurityAlert,
};