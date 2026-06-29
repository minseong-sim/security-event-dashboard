function LoginAttemptsTable({ loginAttempts }) {
  if (loginAttempts.length === 0) {
    return <p style={styles.empty}>No login attempts found.</p>;
  }

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Username</th>
            <th style={styles.th}>Email</th>
            <th style={styles.th}>IP Address</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Attempted At</th>
          </tr>
        </thead>
        <tbody>
          {loginAttempts.map((attempt) => (
            <tr key={attempt.id}>
              <td style={styles.td}>{attempt.id}</td>
              <td style={styles.td}>{attempt.username_attempted}</td>
              <td style={styles.td}>{attempt.email || '-'}</td>
              <td style={styles.td}>{attempt.ip_address}</td>
              <td style={styles.td}>
                <span
                  style={
                    attempt.success
                      ? styles.successBadge
                      : styles.failedBadge
                  }
                >
                  {attempt.success ? 'Success' : 'Failed'}
                </span>
              </td>
              <td style={styles.td}>
                {new Date(attempt.attempted_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
  },
  th: {
    background: '#f9fafb',
    color: '#374151',
    textAlign: 'left',
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    fontWeight: 700,
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #e5e7eb',
    color: '#111827',
  },
  successBadge: {
    display: 'inline-block',
    background: '#ecfdf5',
    color: '#047857',
    padding: '5px 9px',
    borderRadius: '999px',
    fontWeight: 700,
    fontSize: '12px',
  },
  failedBadge: {
    display: 'inline-block',
    background: '#fee2e2',
    color: '#b91c1c',
    padding: '5px 9px',
    borderRadius: '999px',
    fontWeight: 700,
    fontSize: '12px',
  },
  empty: {
    color: '#6b7280',
    background: '#f9fafb',
    padding: '16px',
    borderRadius: '12px',
  },
};

export default LoginAttemptsTable;