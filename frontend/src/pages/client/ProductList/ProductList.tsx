import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.css';
import { api } from '../../../services/api';

const CATEGORIES = ['Tất cả', 'Hủ Tiếu Nước', 'Hủ Tiếu Khô', 'Combo'];

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.get('/products');
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === 'Tất cả'
    ? products
    : products.filter(p => p.category?.name === activeCategory);

  return (
    <div className="container animate-fade-in" style={{ padding: '4rem 0' }}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Thực Đơn <span className="text-primary">Xóm Tíu</span></h1>
        <p className={styles.description}>Khám phá hương vị đậm đà trong từng tô hủ tiếu truyền thống.</p>
      </div>

      <div className={styles.filters}>
        {CATEGORIES.map(category => (
          <button
            key={category}
            className={`${styles.filterBtn} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className={styles.productGrid}>
        {isLoading ? (
          // Skeleton Loader
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className={styles.productCard} style={{ cursor: 'default' }}>
              <div className={styles.productImageWrapper} style={{ backgroundColor: '#e0e0e0', animation: 'pulse 1.5s infinite' }}>
              </div>
              <div className={styles.productInfo}>
                <div style={{ height: '24px', backgroundColor: '#e0e0e0', width: '70%', marginBottom: '10px', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ height: '16px', backgroundColor: '#e0e0e0', width: '100%', marginBottom: '6px', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ height: '16px', backgroundColor: '#e0e0e0', width: '50%', marginBottom: '15px', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
                <div style={{ height: '20px', backgroundColor: '#e0e0e0', width: '40%', borderRadius: '4px', animation: 'pulse 1.5s infinite' }}></div>
              </div>
            </div>
          ))
        ) : filteredProducts.map((product) => (
          <Link to={`/menu/${product.id}`} key={product.id} className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              {/* Fake a tag for demo if combo */}
              {product.category?.name === 'Combo' && <span className={styles.productTag}>Tiết kiệm</span>}
              <img src={product.image} alt={product.name} className={styles.productImg} />
              <div className={styles.productOverlay}>
                <button className="btn btn-primary">Thêm vào giỏ</button>
              </div>
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              {product.shortDescription && (
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {product.shortDescription}
                </p>
              )}
              <div className={styles.productPrice}>
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
              </div>
            </div>
          </Link>
        ))}
        {!isLoading && filteredProducts.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>Không có sản phẩm nào trong danh mục này.</div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
