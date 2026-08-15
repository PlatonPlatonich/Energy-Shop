import { useState } from 'react';
import './Header.css';
import Cart from './Cart';
import ModalLogin from './ModalLogin';
import { Link } from 'react-router-dom';
function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const token = localStorage.getItem('token');

  const handleLoginSuccess = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  // Функция для плавного скролла к каталогу
  const scrollToCatalog = (e) => {
    e.preventDefault(); // Отменяем перезагрузку страницы
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>⚡ Energy Store</a>
      </div>

      <nav>
      <nav>
        <Link to="/#catalog" style={{ color: '#fff', textDecoration: 'none' }}>Каталог</Link>
        
        {/* Заменили <a href="#about"> на <Link to="/about"> */}
        <Link to="/about" style={{ color: '#fff', textDecoration: 'none' }}>О нас</Link>
        
        {/* Заменили <a href="#contacts"> на <Link to="/contacts"> */}
        <Link to="/contacts" style={{ color: '#fff', textDecoration: 'none' }}>Контакты</Link>
      </nav>
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {token ? (
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px' }}>
            Выход
          </button>
        ) : (
          <button onClick={() => setIsLoginOpen(true)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
            Вход
          </button>
        )}
        
        <button className="cartButton" onClick={() => setIsCartOpen(true)}>
          🛒 Корзина
        </button>
      </div>

      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      {isLoginOpen && <ModalLogin onClose={() => setIsLoginOpen(false)} onLogin={handleLoginSuccess} />}
    </header>
  );
}

export default Header;