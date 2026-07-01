import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');
    setLoading(true);

    try {
      await axios.post(`${API_BASE_URL}/api/auth/register`, formData);

      setSuccess('Account created successfully. Redirecting to login...');

      setTimeout(() => {
        navigate('/login');
      }, 800);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Failed to register. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <p style={styles.label}>Security Event Dashboard</p>
        <h1 style={styles.title}>Create account</h1>
        <p style={styles.description}>
          Register a user account to test authentication logging and security
          event monitoring.
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

          <label style={styles.labelText}>Email</label>
          <input
            style={styles.input}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="alice@example.com"
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
          {success && <p style={styles.success}>{success}</p>}

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login">Login</Link>
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
  success: {
    background: '#ecfdf5',
    color: '#047857',
    padding: '10px 12px',
    borderRadius: '10px',
    fontWeight: 600,
  },
  footerText: {
    marginTop: '20px',
    color: '#6b7280',
    textAlign: 'center',
  },
};

export default Register;