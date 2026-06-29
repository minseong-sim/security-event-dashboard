function SummaryCards({ summary }) {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    minWidth: '180px',
  };

  const containerStyle = {
    display: 'flex',
    gap: '16px',
    marginTop: '24px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h3>Total Attempts</h3>
        <p>{summary.totalLoginAttempts}</p>
      </div>

      <div style={cardStyle}>
        <h3>Successful</h3>
        <p>{summary.successfulAttempts}</p>
      </div>

      <div style={cardStyle}>
        <h3>Failed</h3>
        <p>{summary.failedAttempts}</p>
      </div>

      <div style={cardStyle}>
        <h3>Active Alerts</h3>
        <p>{summary.activeAlerts}</p>
      </div>
    </div>
  );
}

export default SummaryCards;