import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Minus, Plus } from 'lucide-react';
import styles from './ProductDetail.module.css';
import { api } from '../../../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  // Fixed toppings for demo
  const toppings = [
    { id: 't1', name: 'Thêm tôm (2 con)', price: 15000 },
    { id: 't2', name: 'Thêm trứng cút (3 quả)', price: 10000 },
    { id: 't3', name: 'Thêm xí quách', price: 25000 },
    { id: 't4', name: 'Thêm tóp mỡ', price: 5000 },
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.get(`/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error('Failed to fetch product detail', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);

  const handleToppingToggle = (toppingId: string) => {
    setSelectedToppings(prev => 
      prev.includes(toppingId) 
        ? prev.filter(t => t !== toppingId)
        : [...prev, toppingId]
    );
  };

  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity(q => q + 1);

  if (isLoading) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Đang tải thông tin sản phẩm...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container animate-fade-in" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Sản phẩm không tồn tại</h2>
        <Link to="/menu" className="btn btn-primary" style={{ marginTop: '1rem' }}>Về trang Thực đơn</Link>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in">
      <Link to="/menu" className={styles.backLink}>
        <ArrowLeft size={20} /> Trở về Thực Đơn
      </Link>

      <div className={styles.productDetail}>
        <div className={styles.imageSection}>
          {product.category?.name === 'Combo' && <span className={styles.tag}>Tiết kiệm</span>}
          <img src={product.image || 'https://via.placeholder.com/400'} alt={product.name} className={styles.image} />
        </div>

        <div className={styles.infoSection}>
          <h1 className={styles.title}>{product.name}</h1>
          <div className={styles.price}>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
          </div>
          
          {product.shortDescription && (
            <div style={{ padding: '1rem', backgroundColor: '#f9f5f0', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <p style={{ margin: 0, fontWeight: 500, color: '#8b5a2b' }}>{product.shortDescription}</p>
            </div>
          )}

          <div className={styles.optionsSection}>
            <h3 className={styles.optionsTitle}>Tùy chọn thêm (Toppings)</h3>
            <div className={styles.optionsGrid}>
              {toppings.map(topping => (
                <label key={topping.id} className={styles.optionLabel}>
                  <input 
                    type="checkbox" 
                    checked={selectedToppings.includes(topping.id)}
                    onChange={() => handleToppingToggle(topping.id)}
                  />
                  <span className={styles.optionText}>{topping.name}</span>
                  <span className={styles.optionPrice}>
                    +{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(topping.price)}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <div className={styles.quantityCtrl}>
              <button className={styles.qtyBtn} onClick={handleDecrease}>
                <Minus size={20} />
              </button>
              <div className={styles.qtyValue}>{quantity}</div>
              <button className={styles.qtyBtn} onClick={handleIncrease}>
                <Plus size={20} />
              </button>
            </div>
            <button className={`btn btn-primary ${styles.addToCartBtn}`}>
              <ShoppingCart size={20} /> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Long Description Section Below */}
      {product.description && (
        <div className={styles.longDescriptionSection} style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem', display: 'inline-block' }}>
            Mô tả sản phẩm
          </h2>
          <div style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', color: '#555', fontSize: '1.05rem' }}>
            {product.description}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
