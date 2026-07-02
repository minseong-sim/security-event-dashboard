import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import SummaryCards from '../components/SummaryCards';
import LoginAttemptsTable from '../components/LoginAttemptsTable';
import AlertsTable from '../components/AlertsTable';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const [summary, setSummary] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [securityAlerts, setSecurityAlerts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = 'http://localhost:5001';

  const fetchDashboardData = async () => {
    try {
      setError('');

      const summaryResponse = await axios.get(
        `${API_BASE_URL}/api/dashboard/summary`
      );

      const loginAttemptsResponse = await axios.get(
        `${API_BASE_URL}/api/login-attempts`
      );

      const securityAlertsResponse = await axios.get(
        `${API_BASE_URL}/api/security-alerts`
      );

      setSummary(summaryResponse.data);
      setLoginAttempts(loginAttemptsResponse.data.loginAttempts);
      setSecurityAlerts(securityAlertsResponse.data.securityAlerts);
    } catch (err) {
      console.error(err);
      setError(
        'Failed to load dashboard data. Please check if the backend server is running.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleResolveAlert = async (alertId) => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/security-alerts/${alertId}/resolve`
      );

      await fetchDashboardData();
    } catch (err) {
      console.error(err);
      setError('Failed to resolve security alert.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <header style={styles.header}>
          <div>
            <p style={styles.label}>Security Monitoring Project</p>
            <h1 style={styles.title}>Security Event Dashboard</h1>
            <p style={styles.description}>
              Monitor login attempts, detect repeated failures, and review
              suspicious authentication activity in one dashboard.
            </p>
          </div>

          <div style={styles.headerActions}>
            {user && (
              <div style={styles.userBox}>
                Logged in as <strong>{user.username}</strong>
              </div>
            )}

            <div style={styles.statusBox}>
              <span style={styles.statusDot}></span>
              Backend Connected
            </div>

            <button style={styles.logoutButton} onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        {loading && <p style={styles.infoText}>Loading dashboard data...</p>}

        {error && <p style={styles.errorText}>{error}</p>}

        {!loading && !error && summary && (
          <>
            <SummaryCards summary={summary} />

            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>Security Alerts</h2>
                  <p style={styles.sectionDescription}>
                    Alerts generated from suspicious login behaviour.
                  </p>
                </div>
              </div>

              <AlertsTable
                alerts={securityAlerts}
                onResolveAlert={handleResolveAlert}
              />
            </section>

            <section style={styles.section}>
              <div style={styles.sectionHeader}>
                <div>
                  <h2 style={styles.sectionTitle}>Recent Login Attempts</h2>
                  <p style={styles.sectionDescription}>
                    Latest authentication events recorded by the backend.
                  </p>
                </div>
              </div>

              <LoginAttemptsTable loginAttempts={loginAttempts} />
            </section>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f7fb',
    color: '#111827',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif',
    padding: '32px',
  },
  container: {
    maxWidth: '1180px',
    margin: '0 auto',
  },
  header: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '28px',
    marginBottom: '24px',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    gap: '24px',
    alignItems: 'flex-start',
  },
  headerActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  label: {
    margin: 0,
    color: '#2563eb',
    fontWeight: 700,
    fontSize: '14px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  title: {
    margin: '8px 0 12px',
    fontSize: '36px',
    lineHeight: 1.1,
  },
  description: {
    margin: 0,
    color: '#4b5563',
    fontSize: '16px',
    maxWidth: '680px',
    lineHeight: 1.6,
  },
  userBox: {
    padding: '10px 14px',
    borderRadius: '999px',
    background: '#eff6ff',
    color: '#1d4ed8',
    fontWeight: 600,
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
  statusBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 14px',
    borderRadius: '999px',
    background: '#ecfdf5',
    color: '#047857',
    fontWeight: 700,
    fontSize: '14px',
    whiteSpace: 'nowrap',
  },
  statusDot: {
    width: '9px',
    height: '9px',
    borderRadius: '999px',
    background: '#10b981',
    display: 'inline-block',
  },
  logoutButton: {
    padding: '10px 14px',
    borderRadius: '999px',
    border: 'none',
    background: '#111827',
    color: '#ffffff',
    fontWeight: 700,
    cursor: 'pointer',
  },
  section: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '16px',
  },
  sectionTitle: {
    margin: 0,
    fontSize: '22px',
  },
  sectionDescription: {
    margin: '6px 0 0',
    color: '#6b7280',
    fontSize: '14px',
  },
  infoText: {
    color: '#374151',
    background: '#ffffff',
    padding: '16px',
    borderRadius: '12px',
  },
  errorText: {
    color: '#b91c1c',
    background: '#fee2e2',
    padding: '16px',
    borderRadius: '12px',
    fontWeight: 600,
  },
};

export default Dashboard;