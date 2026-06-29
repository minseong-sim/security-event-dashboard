function AlertsTable({ alerts }) {
  if (alerts.length === 0) {
    return <p style={styles.empty}>No security alerts found.</p>;
  }

  return (
    <div style={styles.tableWrapper}>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Type</th>
            <th style={styles.th}>Message</th>
            <th style={styles.th}>IP Address</th>
            <th style={styles.th}>Resolved</th>
            <th style={styles.th}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {alerts.map((alert) => (
            <tr key={alert.id}>
              <td style={styles.td}>{alert.id}</td>
              <td style={styles.td}>
                <span style={styles.alertBadge}>{alert.alert_type}</span>
              </td>
              <td style={styles.td}>{alert.message}</td>
              <td style={styles.td}>{alert.ip_address}</td>
              <td style={styles.td}>
                <span
                  style={
                    alert.resolved
                      ? styles.resolvedBadge
                      : styles.unresolvedBadge
                  }
                >
                  {alert.resolved ? 'Resolved' : 'Open'}
                </span>
              </td>
              <td style={styles.td}>
                {new Date(alert.created_at).toLocaleString()}
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
    verticalAlign: 'top',
  },
  alertBadge: {
    display: 'inline-block',
    background: '#fee2e2',
    color: '#b91c1c',
    padding: '5px 9px',
    borderRadius: '999px',
    fontWeight: 700,
    fontSize: '12px',
    whiteSpace: 'nowrap',
  },
  unresolvedBadge: {
    display: 'inline-block',
    background: '#fff7ed',
    color: '#c2410c',
    padding: '5px 9px',
    borderRadius: '999px',
    fontWeight: 700,
    fontSize: '12px',
  },
  resolvedBadge: {
    display: 'inline-block',
    background: '#ecfdf5',
    color: '#047857',
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

export default AlertsTable;