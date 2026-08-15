import { Link } from 'react-router-dom';

function About() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Link to="/" style={styles.backLink}>← Назад к каталогу</Link>
        <h1 style={styles.title}>О нас</h1>
        <p style={styles.text}>
          Добро пожаловать в <strong>Energy Store</strong> — ваш главный поставщик бодрости и энергии!
        </p>
        <p style={styles.text}>
          Мы — команда энтузиастов, обожающих энергетические напитки со всего мира. 
          Наша миссия — привозить самые вкусные, редкие и популярные линейки, 
          такие как Monster Energy, и делать их доступными для вас.
        </p>
        <p style={styles.text}>
          Мы заботимся о качестве, свежести товаров и вашем комфорте. 
          Всегда рады видеть вас в нашем магазине!
        </p>
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
  text: {
    fontSize: '16px',
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '15px',
  }
};

export default About;