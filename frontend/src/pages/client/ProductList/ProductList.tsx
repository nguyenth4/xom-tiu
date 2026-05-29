import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './ProductList.module.css';

const CATEGORIES = ['Tất cả', 'Hủ Tiếu Nước', 'Hủ Tiếu Khô', 'Combo'];

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Hủ Tiếu Tươi',
    price: '65,000đ',
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?q=80&w=800&auto=format&fit=crop',
    tag: 'Bán chạy',
    category: 'Hủ Tiếu Nước'
  },
  {
    id: 2,
    name: 'Hủ Tiếu Khô',
    price: '65,000đ',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&auto=format&fit=crop',
    category: 'Hủ Tiếu Khô'
  },
  {
    id: 3,
    name: 'Combo Tươi & Khô',
    price: '120,000đ',
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b485d?q=80&w=800&auto=format&fit=crop',
    tag: 'Tiết kiệm',
    category: 'Combo'
  }
];

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');

  const filteredProducts = activeCategory === 'Tất cả'
    ? MOCK_PRODUCTS
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

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
        {filteredProducts.map((product) => (
          <Link to={`/menu/${product.id}`} key={product.id} className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              {product.tag && <span className={styles.productTag}>{product.tag}</span>}
              <img src={product.image} alt={product.name} className={styles.productImg} />
              <div className={styles.productOverlay}>
                <button className="btn btn-primary">Thêm vào giỏ</button>
              </div>
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <div className={styles.productPrice}>{product.price}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
