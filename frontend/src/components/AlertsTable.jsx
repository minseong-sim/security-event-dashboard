function AlertsTable({ alerts }) {
  if (alerts.length === 0) {
    return <p>No security alerts found.</p>;
  }

  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Message</th>
          <th>IP Address</th>
          <th>Resolved</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map((alert) => (
          <tr key={alert.id}>
            <td>{alert.id}</td>
            <td>{alert.alert_type}</td>
            <td>{alert.message}</td>
            <td>{alert.ip_address}</td>
            <td>{alert.resolved ? 'Yes' : 'No'}</td>
            <td>{new Date(alert.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AlertsTable;