const bcrypt = require('bcrypt');
const pool = require('../db/pool');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: 'Username, email, and password are required',
      });
    }

    const existingUser = await pool.query(
      'select * from users where username = $1 or email = $2',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        message: 'Username or email already exists',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `insert into users (username, email, password_hash)
       values ($1, $2, $3)
       returning id, username, email, role, created_at`,
      [username, email, passwordHash]
    );

    return res.status(201).json({
      message: 'User registered successfully',
      user: result.rows[0],
    });
  } catch (err) {
    console.error('Register error:', err.message);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const ipAddress =
      req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username and password are required',
      });
    }

    const userResult = await pool.query(
      'select * from users where username = $1',
      [username]
    );

    const user = userResult.rows[0];

    if (!user) {
      await pool.query(
        `insert into login_attempts (user_id, username_attempted, ip_address, success)
         values ($1, $2, $3, $4)`,
        [null, username, ipAddress, false]
      );

      return res.status(401).json({
        message: 'Invalid username or password',
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password_hash
    );

    await pool.query(
      `insert into login_attempts (user_id, username_attempted, ip_address, success)
       values ($1, $2, $3, $4)`,
      [user.id, username, ipAddress, isPasswordCorrect]
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: 'Invalid username or password',
      });
    }

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err.message);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};

module.exports = {
  register,
  login,
};