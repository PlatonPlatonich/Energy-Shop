
import { Link } from 'react-router-dom';

function Contacts() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Link to="/" style={styles.backLink}>← Назад к каталогу</Link>
        <h1 style={styles.title}>Контакты</h1>
        
        <div style={styles.contactItem}>
          <span style={styles.contactLabel}>📧 Email:</span>
          <span style={styles.contactValue}>kasyanovplaton@bk.ru</span>
        </div>

        <div style={styles.contactItem}>
          <span style={styles.contactLabel}>📞 Телефон:</span>
          <span style={styles.contactValue}>+7 (988) 527-60-27</span>
        </div>

        <div style={styles.contactItem}>
          <span style={styles.contactLabel}>📍 Адрес:</span>
          <span style={styles.contactValue}>г. Краснодар, ул. Олимпийская, д. 6</span>
        </div>

        <div style={styles.contactItem}>
          <span style={styles.contactLabel}>🕒 Режим работы:</span>
          <span style={styles.contactValue}>Ежедневно, 10:00 – 22:00</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#1a202c',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '16px',
    padding: '40px',
    maxWidth: '700px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '20px',
    color: '#22c55e',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: '20px',
    borderBottom: '2px solid #22c55e',
    paddingBottom: '10px',
  },
  contactItem: {
    marginBottom: '15px',
    fontSize: '18px',
    color: '#333',
  },
  contactLabel: {
    fontWeight: 'bold',
    color: '#22c55e',
    marginRight: '10px',
  },
  contactValue: {
    color: '#444',
  }
};

export default Contacts;