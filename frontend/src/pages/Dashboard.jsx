import { useEffect, useState } from 'react';
import axios from 'axios';

import SummaryCards from '../components/SummaryCards';
import LoginAttemptsTable from '../components/LoginAttemptsTable';
import AlertsTable from '../components/AlertsTable';

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [securityAlerts, setSecurityAlerts] = useState([]);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:5001';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
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
        setError('Failed to load dashboard data');
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div style={{ padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Security Event Dashboard</h1>
      <p>
        This dashboard monitors login attempts and highlights suspicious login
        activity.
      </p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {summary && <SummaryCards summary={summary} />}

      <h2>Security Alerts</h2>
      <AlertsTable alerts={securityAlerts} />

      <h2>Recent Login Attempts</h2>
      <LoginAttemptsTable loginAttempts={loginAttempts} />
    </div>
  );
}

export default Dashboard;