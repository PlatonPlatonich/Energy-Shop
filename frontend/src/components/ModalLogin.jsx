import { useState } from 'react';

function ModalLogin({ onClose, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    
    console.log("📤 Отправляем данные:", { email, password, birthDate });

    
    if (isRegistering) {
      
      if (!birthDate || birthDate.trim() === '') {
        setMessage({ type: 'error', text: 'Пожалуйста, выберите дату рождения.' });
        setLoading(false);
        return;
      }
    }

    const url = isRegistering 
      ? 'http://localhost:8000/register' 
      : 'http://localhost:8000/login';

    let body;
    if (isRegistering) {
      
      body = JSON.stringify({ email, password, birth_date: birthDate });
    } else {
      body = JSON.stringify({ email, password });
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body
      });

      const data = await response.json();

      if (response.ok) {
        if (!isRegistering) {
          localStorage.setItem('token', data.access_token);
          setMessage({ type: 'success', text: 'Вход выполнен успешно!' });
          setTimeout(() => {
            onLogin(); 
            onClose();
          }, 1000);
        } else {
          setMessage({ type: 'success', text: 'Аккаунт создан! Теперь войдите.' });
          setTimeout(() => setIsRegistering(false), 1500);
        }
      } else {
        setMessage({ type: 'error', text: data.detail || 'Что-то пошло не так' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Ошибка соединения с сервером' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>✕</button>
        <h2 style={styles.title}>{isRegistering ? 'Регистрация' : 'Вход'}</h2>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
            minLength={4}
          />

          {/* Если это регистрация - показываем поле даты */}
          {isRegistering && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '14px', color: '#9ca3af' }}>Ваша дата рождения</label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          )}
          
          {message && (
            <div style={{ 
              color: message.type === 'success' ? '#22c55e' : '#dc2626', 
              marginBottom: '10px', fontSize: '14px' 
            }}>
              {message.text}
            </div>
          )}
          
          <button type="submit" disabled={loading} style={styles.submitBtn}>
            {loading ? 'Загрузка...' : (isRegistering ? 'Зарегистрироваться' : 'Войти')}
          </button>
        </form>

        <div style={styles.switchText}>
          {isRegistering ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
          <button 
            onClick={() => setIsRegistering(!isRegistering)} 
            style={styles.switchBtn}
          >
            {isRegistering ? ' Войти' : ' Зарегистрироваться'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Стили модального окна (остались без изменений)
const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000
  },
  modal: {
    backgroundColor: '#1f2937', padding: '30px', borderRadius: '12px',
    minWidth: '320px', color: '#fff', position: 'relative', boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
  },
  closeBtn: {
    position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none',
    color: '#9ca3af', fontSize: '20px', cursor: 'pointer'
  },
  title: { textAlign: 'center', marginBottom: '20px', fontSize: '24px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  input: {
    padding: '12px', borderRadius: '6px', border: '1px solid #374151',
    backgroundColor: '#111827', color: '#fff', fontSize: '16px', outline: 'none'
  },
  submitBtn: {
    padding: '12px', backgroundColor: '#22c55e', color: '#fff', border: 'none',
    borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px'
  },
  switchText: { textAlign: 'center', marginTop: '15px', fontSize: '14px', color: '#9ca3af' },
  switchBtn: { background: 'none', border: 'none', color: '#22c55e', cursor: 'pointer', fontWeight: 'bold' }
};

export default ModalLogin;