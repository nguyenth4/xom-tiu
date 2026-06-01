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
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Bypass cache for product detail to always get the latest variants, price, and stock
        const data = await api.get(`/products/${id}`, false);
        setProduct(data);
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);
        }
      } catch (error) {
        console.error('Failed to fetch product detail', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchProduct();
  }, [id]);


  const handleDecrease = () => setQuantity(q => Math.max(1, q - 1));
  const handleIncrease = () => setQuantity(q => q + 1);

  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem = {
      id: Date.now().toString(),
      productId: product.id,
      name: product.name,
      price: selectedVariant ? selectedVariant.price : product.price,
      image: product.image,
      quantity,
      toppings: selectedVariant ? [selectedVariant.name] : []
    };

    const savedCart = localStorage.getItem('cart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    
    const existingIndex = cart.findIndex((item: any) => 
      item.productId === cartItem.productId && 
      JSON.stringify(item.toppings) === JSON.stringify(cartItem.toppings)
    );

    if (existingIndex >= 0) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert('Đã thêm sản phẩm vào giỏ hàng');
  };

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
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedVariant ? selectedVariant.price : product.price)}
          </div>
          
          {product.shortDescription && (
            <div style={{ padding: '1rem', backgroundColor: '#f9f5f0', borderRadius: '8px', marginBottom: '1.5rem' }}>
              <p style={{ margin: 0, fontWeight: 500, color: '#8b5a2b' }}>{product.shortDescription}</p>
            </div>
          )}

          {product.variants && product.variants.length > 0 && (
            <div className={styles.optionsSection}>
              <h3 className={styles.optionsTitle}>Phân loại / Biến thể</h3>
              <div className={styles.optionsGrid}>
                {product.variants.map((v: any, idx: number) => (
                  <label 
                    key={idx} 
                    className={styles.optionLabel} 
                    style={{ borderColor: selectedVariant?.name === v.name ? 'var(--color-primary-red)' : 'var(--color-border)' }}
                  >
                    <input 
                      type="radio" 
                      name="variant"
                      checked={selectedVariant?.name === v.name}
                      onChange={() => setSelectedVariant(v)}
                    />
                    <span className={styles.optionText}>{v.name}</span>
                    <span className={styles.optionPrice}>
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(v.price)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

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
            <button className={`btn btn-primary ${styles.addToCartBtn}`} onClick={handleAddToCart}>
              <ShoppingCart size={20} /> Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      </div>

      {/* Long Description Section Below */}
      {product.description && (
        <div className={styles.longDescriptionSection} style={{ marginTop: '4rem', padding: '2rem', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: '#333', borderBottom: '2px solid #e0e0e0', paddingBottom: '0.5rem', display: 'inline-block' }}>
            Thông tin sản phẩm
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
