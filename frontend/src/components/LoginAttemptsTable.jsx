function LoginAttemptsTable({ loginAttempts }) {
  if (loginAttempts.length === 0) {
    return <p>No login attempts found.</p>;
  }

  return (
    <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>IP Address</th>
          <th>Status</th>
          <th>Attempted At</th>
        </tr>
      </thead>
      <tbody>
        {loginAttempts.map((attempt) => (
          <tr key={attempt.id}>
            <td>{attempt.id}</td>
            <td>{attempt.username_attempted}</td>
            <td>{attempt.email || '-'}</td>
            <td>{attempt.ip_address}</td>
            <td>{attempt.success ? 'Success' : 'Failed'}</td>
            <td>{new Date(attempt.attempted_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LoginAttemptsTable;