function SummaryCards({ summary }) {
  const cards = [
    {
      title: 'Total Attempts',
      value: summary.totalLoginAttempts,
      description: 'All recorded login events',
      tone: 'default',
    },
    {
      title: 'Successful',
      value: summary.successfulAttempts,
      description: 'Successful login attempts',
      tone: 'success',
    },
    {
      title: 'Failed',
      value: summary.failedAttempts,
      description: 'Failed login attempts',
      tone: 'danger',
    },
    {
      title: 'Active Alerts',
      value: summary.activeAlerts,
      description: 'Unresolved security alerts',
      tone: 'warning',
    },
  ];

  return (
    <div style={styles.grid}>
      {cards.map((card) => (
        <div key={card.title} style={{ ...styles.card, ...getToneStyle(card.tone) }}>
          <p style={styles.cardTitle}>{card.title}</p>
          <p style={styles.cardValue}>{card.value}</p>
          <p style={styles.cardDescription}>{card.description}</p>
        </div>
      ))}
    </div>
  );
}

const getToneStyle = (tone) => {
  if (tone === 'success') {
    return {
      borderTop: '4px solid #10b981',
    };
  }

  if (tone === 'danger') {
    return {
      borderTop: '4px solid #ef4444',
    };
  }

  if (tone === 'warning') {
    return {
      borderTop: '4px solid #f59e0b',
    };
  }

  return {
    borderTop: '4px solid #3b82f6',
  };
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '18px',
    marginBottom: '24px',
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '22px',
    boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
  },
  cardTitle: {
    margin: 0,
    color: '#6b7280',
    fontSize: '14px',
    fontWeight: 700,
  },
  cardValue: {
    margin: '12px 0 8px',
    fontSize: '34px',
    fontWeight: 800,
    color: '#111827',
  },
  cardDescription: {
    margin: 0,
    color: '#6b7280',
    fontSize: '14px',
  },
};

export default SummaryCards;