import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProductCard() {
  const { id } = useParams(); // Получаем ID товара из адресной строки
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/products/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка при загрузке товара:", err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Пожалуйста, войдите в аккаунт, чтобы добавить товар в корзину.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/cart/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          product_id: product.id,
          quantity: 1,
        }),
      });

      if (response.status === 401) {
        alert('Сессия истекла. Войдите заново.');
        localStorage.removeItem('token');
        window.location.reload();
        return;
      }

      if (response.ok) {
        alert('✅ Товар добавлен в корзину!');
      } else {
        alert('Ошибка при добавлении в корзину');
      }
    } catch (error) {
      console.error('Ошибка сети:', error);
      alert('Не удалось подключиться к серверу');
    }
  };

  if (loading) return <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>Загрузка товара...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '50px' }}>Ошибка: {error}</div>;
  if (!product) return <div style={{ color: '#fff', textAlign: 'center', padding: '50px' }}>Товар не найден</div>;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <Link to="/" style={styles.backLink}>← Назад к каталогу</Link>
        
        <div style={styles.content}>
          {product.image_url && (
            <div style={styles.imageContainer}>
              <img src={product.image_url} alt={product.name} style={styles.image} />
            </div>
          )}
          
          <div style={styles.info}>
            <h1 style={styles.title}>{product.name}</h1>
            <div style={styles.meta}>
              {product.brand} • {product.flavor} • {product.volume_ml}мл
            </div>
            <p style={styles.description}>{product.description}</p>
            
            <div style={styles.footer}>
              <span style={styles.price}>{product.price} ₽</span>
              <span style={product.stock > 0 ? styles.inStock : styles.outOfStock}>
                {product.stock > 0 ? `В наличии: ${product.stock}` : 'Нет в наличии'}
              </span>
            </div>
            
            <button 
              onClick={handleAddToCart}
              style={styles.buyButton}
            >
              Добавить в корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Стили для страницы товара
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
    maxWidth: '800px',
    width: '100%',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    position: 'relative',
  },
  backLink: {
    display: 'inline-block',
    marginBottom: '20px',
    color: '#22c55e',
    textDecoration: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  content: {
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
  },
  imageContainer: {
    flex: '1 1 300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '300px',
    height: 'auto',
    objectFit: 'contain',
  },
  info: {
    flex: '1 1 300px',
  },
  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '0 0 10px 0',
    color: '#1a1a1a',
  },
  meta: {
    fontSize: '16px',
    color: '#666',
    marginBottom: '20px',
  },
  description: {
    fontSize: '16px',
    lineHeight: '1.6',
    color: '#333',
    marginBottom: '30px',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  price: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#22c55e',
  },
  inStock: {
    color: '#16a34a',
    fontWeight: '500',
  },
  outOfStock: {
    color: '#dc2626',
    fontWeight: '500',
  },
  buyButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#22c55e',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background 0.2s',
  }
};

export default ProductCard;