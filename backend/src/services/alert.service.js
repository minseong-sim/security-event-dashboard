const pool = require('../db/pool');

const checkAndCreateFailedLoginAlert = async (ipAddress) => {
  const failedAttemptsResult = await pool.query(
    `select count(*) 
     from login_attempts
     where ip_address = $1
       and success = false
       and attempted_at >= now() - interval '10 minutes'`,
    [ipAddress]
  );

  const failedAttempts = Number(failedAttemptsResult.rows[0].count);

  if (failedAttempts < 5) {
    return null;
  }

  const existingAlertResult = await pool.query(
    `select *
     from security_alerts
     where ip_address = $1
       and alert_type = 'BRUTE_FORCE_ATTEMPT'
       and resolved = false
       and created_at >= now() - interval '10 minutes'`,
    [ipAddress]
  );

  if (existingAlertResult.rows.length > 0) {
    return existingAlertResult.rows[0];
  }

  const alertResult = await pool.query(
    `insert into security_alerts (alert_type, message, ip_address)
     values ($1, $2, $3)
     returning *`,
    [
      'BRUTE_FORCE_ATTEMPT',
      `${failedAttempts} failed login attempts detected from IP ${ipAddress} within 10 minutes`,
      ipAddress,
    ]
  );

  return alertResult.rows[0];
};

module.exports = {
  checkAndCreateFailedLoginAlert,
};