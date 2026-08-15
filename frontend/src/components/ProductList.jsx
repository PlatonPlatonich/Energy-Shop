import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // <-- Добавили импорт
import "./ProductList.css";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/products/')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Ошибка HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Ошибка при загрузке товаров:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '40px', color: '#fff' }}>Загрузка энергетиков...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', padding: '40px' }}>Ошибка: {error}</div>;

  return (
    <div id="catalog" className="product-list-container">
      {products.length === 0 ? (
        <p style={{ color: '#fff' }}>Товаров пока нет в наличии.</p>
      ) : (
        products.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="product-card">
              {product.image_url && (
                <img src={product.image_url} alt={product.name} className="product-image" />
              )}
              
              <h3 className="product-title">{product.name}</h3>
              
              <div className="product-meta">
                {product.brand} • {product.flavor} • {product.volume_ml}мл
              </div>
              
              <p className="product-description" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {product.description}
              </p>
              
              <div className="product-footer">
                <span className="product-price">{product.price} ₽</span>
                <span className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                  {product.stock > 0 ? `В наличии: ${product.stock}` : 'Нет в наличии'}
                </span>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default ProductList;