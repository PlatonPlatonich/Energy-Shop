import { useEffect, useState } from 'react';

function Cart({ onClose }) {
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchWithAuth = (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    });
  };

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    Promise.all([
      fetchWithAuth('http://localhost:8000/cart/').then(res => res.json()),
      fetch('http://localhost:8000/products/').then(res => res.json())
    ])
    .then(([cartData, productsData]) => {
      setItems(cartData);
      setProducts(productsData);
      setLoading(false);
    })
    .catch(err => console.error("Ошибка загрузки данных:", err));
  }, [token]);

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      await handleDeleteItem(itemId);
      return;
    }

    try {
      const response = await fetchWithAuth(`http://localhost:8000/cart/${itemId}`, {
        method: 'PUT',
        body: JSON.stringify({ quantity: newQuantity })
      });

      if (response.status === 401) {
        alert('Сессия истекла. Войдите снова.');
        localStorage.removeItem('token');
        window.location.reload();
        return;
      }

      if (response.ok) {
        setItems(prevItems => prevItems.map(item => 
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
      } else {
        console.error("Ошибка обновления количества");
      }
    } catch (error) {
      console.error("Ошибка сети:", error);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      const response = await fetchWithAuth(`http://localhost:8000/cart/${itemId}`, {
        method: 'DELETE'
      });

      if (response.status === 401) {
        alert('Сессия истекла. Войдите снова.');
        localStorage.removeItem('token');
        window.location.reload();
        return;
      }

      if (response.ok) {
        setItems(prevItems => prevItems.filter(item => item.id !== itemId));
      }
    } catch (error) {
      console.error("Ошибка удаления:", error);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    alert('Наш менеджер свяжется с вами в ближайшее время для подтверждения заказа');
    // Опционально можно очистить корзину после оформления:
    // setItems([]);
  };

  const getProductDetails = (productId) => {
    return products.find(p => p.id === productId);
  };

  // Если нет токена, просим войти
  if (!token) {
    return (
      <div style={modalStyles.overlay}>
        <div style={modalStyles.container}>
          <button onClick={onClose} style={{ float: 'right', cursor: 'pointer', border: 'none', background: 'none', fontSize: '18px' }}>✕</button>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>Чтобы посмотреть корзину, пожалуйста, <strong>войдите</strong> в аккаунт.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={modalStyles.overlay}>
      <div style={modalStyles.container}>
        <h2>Ваша корзина</h2>
        <button onClick={onClose} style={{ float: 'right', cursor: 'pointer', border: 'none', background: 'none', fontSize: '18px' }}>✕</button>
        
        {loading ? (
          <p>Загрузка товаров...</p>
        ) : items.length === 0 ? (
          <p>Корзина пуста.</p>
        ) : (
          <>
            <ul style={{ listStyle: 'none', padding: 0, maxHeight: '400px', overflowY: 'auto' }}>
              {items.map(item => {
                const product = getProductDetails(item.product_id);
                
                return (
                  <li key={item.id} style={{ 
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    borderBottom: '1px solid #eee', padding: '15px 0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                      {product?.image_url && (
                        <img src={product.image_url} alt={product.name} style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '6px' }} />
                      )}
                      <div>
                        <strong>{product ? product.name : `Товар ID: ${item.product_id}`}</strong>
                        <div style={{ fontSize: '14px', color: '#666' }}>
                          {product ? `${product.price} ₽` : 'Цена неизвестна'}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        style={controlBtnStyles}
                      >
                        -
                      </button>
                      <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        style={controlBtnStyles}
                      >
                        +
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        style={{ ...controlBtnStyles, marginLeft: '10px', backgroundColor: '#fee2e2', color: '#dc2626' }}
                      >
                        🗑
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Кнопка оформления заказа */}
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={handleCheckout}
                style={{
                  backgroundColor: '#f59e0b', // оранжевый цвет
                  color: '#fff',
                  border: 'none',
                  padding: '12px 30px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
              >
                Оформить заказ
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const modalStyles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
  },
  container: {
    backgroundColor: 'white', 
    color: '#000', 
    padding: '20px', 
    borderRadius: '12px', 
    minWidth: '350px', 
    maxWidth: '500px', 
    width: '100%', 
    position: 'relative',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
  }
};

const controlBtnStyles = {
  width: '30px', height: '30px',
  borderRadius: '50%', border: '1px solid #ddd',
  backgroundColor: '#f9f9f9', cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontWeight: 'bold', fontSize: '16px'
};

export default Cart;