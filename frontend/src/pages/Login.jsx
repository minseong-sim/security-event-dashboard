import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [alertCreated, setAlertCreated] = useState(false);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:5001';

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setAlertCreated(false);
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        formData
      );

      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);

      navigate('/dashboard');
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message || 'Failed to login. Please try again.'
      );

      if (err.response?.data?.alertCreated) {
        setAlertCreated(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.label}>Security Event Dashboard</p>
        <h1 style={styles.title}>Login</h1>
        <p style={styles.description}>
          Login attempts are recorded by the backend and displayed in the
          dashboard.
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.labelText}>Username</label>
          <input
            style={styles.input}
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="alice"
          />

          <label style={styles.labelText}>Password</label>
          <input
            style={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password123"
          />

          {error && <p style={styles.error}>{error}</p>}

          {alertCreated && (
            <p style={styles.warning}>
              Security alert created after repeated failed login attempts.
            </p>
          )}

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={styles.testBox}>
          <p style={styles.testTitle}>Test account</p>
          <p style={styles.testText}>
            Try registering <strong>alice</strong>, then login successfully or
            intentionally fail several times to trigger an alert.
          </p>
        </div>

        <p style={styles.footerText}>
          Do not have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f7fb',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '430px',
    background: '#ffffff',
    borderRadius: '18px',
    padding: '32px',
    boxShadow: '0 12px 32px rgba(15, 23, 42, 0.1)',
  },
  label: {
    margin: 0,
    color: '#2563eb',
    fontWeight: 700,
    fontSize: '13px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  title: {
    margin: '10px 0 10px',
    fontSize: '32px',
    color: '#111827',
  },
  description: {
    margin: '0 0 24px',
    color: '#6b7280',
    lineHeight: 1.6,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  labelText: {
    color: '#374151',
    fontWeight: 700,
    fontSize: '14px',
    marginTop: '8px',
  },
  input: {
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    outline: 'none',
  },
  button: {
    marginTop: '14px',
    padding: '13px 16px',
    borderRadius: '10px',
    border: 'none',
    background: '#2563eb',
    color: '#ffffff',
    fontWeight: 800,
    fontSize: '15px',
    cursor: 'pointer',
  },
  error: {
    background: '#fee2e2',
    color: '#b91c1c',
    padding: '10px 12px',
    borderRadius: '10px',
    fontWeight: 600,
  },
  warning: {
    background: '#fff7ed',
    color: '#c2410c',
    padding: '10px 12px',
    borderRadius: '10px',
    fontWeight: 600,
  },
  testBox: {
    marginTop: '22px',
    background: '#f9fafb',
    borderRadius: '12px',
    padding: '14px',
    border: '1px solid #e5e7eb',
  },
  testTitle: {
    margin: '0 0 6px',
    fontWeight: 800,
    color: '#111827',
  },
  testText: {
    margin: 0,
    color: '#6b7280',
    fontSize: '14px',
    lineHeight: 1.5,
  },
  footerText: {
    marginTop: '20px',
    color: '#6b7280',
    textAlign: 'center',
  },
};

export default Login;