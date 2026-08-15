import './Hero.css';

function Hero() {
  // Функция для плавного скролла к каталогу
  const scrollToCatalog = (e) => {
    e.preventDefault(); // Отменяем перезагрузку страницы
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <h1>ENERGY STORE</h1>
      <p>Лучшие энергетики по выгодным ценам</p>
      
      {/* Обычная кнопка, которая вызывает скролл */}
      <a href="#catalog" onClick={scrollToCatalog} style={{ textDecoration: 'none' }}>
        <button className="hero-button">Перейти в каталог</button>
      </a>
    </section>
  );
}

export default Hero;