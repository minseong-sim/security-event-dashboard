const pool = require('../db/pool');

const getLoginAttempts = async (req, res) => {
  try {
    const result = await pool.query(
      `select 
         la.id,
         la.user_id,
         la.username_attempted,
         la.ip_address,
         la.success,
         la.attempted_at,
         u.email
       from login_attempts la
       left join users u on la.user_id = u.id
       order by la.attempted_at desc
       limit 50`
    );

    return res.status(200).json({
      loginAttempts: result.rows,
    });
  } catch (err) {
    console.error('Get login attempts error:', err.message);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getLoginAttempts,
};