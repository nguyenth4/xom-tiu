import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { api } from '../../../services/api';
import styles from './Cart.module.css';

interface CartItem {
  id: string;
  productId: string | number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  toppings: string[];
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [address, setAddress] = useState(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.address || '';
      } catch (e) { return ''; }
    }
    return '';
  });

  const [phone, setPhone] = useState(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.phone || '';
      } catch (e) { return ''; }
    }
    return '';
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    window.dispatchEvent(new Event('cartUpdated'));
  }, [cartItems]);

  const navigate = useNavigate();

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setCartItems(items => items.map(item => item.id === id ? { ...item, quantity: newQty } : item));
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal > 0 ? 15000 : 0;
  const total = subtotal + shippingFee;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleCheckout = async () => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      alert('Vui lòng đăng nhập để tiếp tục thanh toán');
      navigate('/login');
      return;
    }
    
    const user = JSON.parse(userStr);
    if (user.role === 'ADMIN') {
      alert('Tài khoản Admin không thể đặt hàng.');
      return;
    }

    if (!address || !phone) {
      alert('Vui lòng nhập địa chỉ và số điện thoại giao hàng.');
      return;
    }
    
    try {
      const user = JSON.parse(userStr);
      await api.post('/orders', {
        userId: user.id || 1,
        shippingAddress: address,
        phone,
        total,
        subtotal,
        status: 'Chờ xác nhận',
        items: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      });
      // Clear cart
      setCartItems([]);
      navigate('/success');
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Có lỗi xảy ra khi tạo đơn hàng. Vui lòng thử lại sau.');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className={`container animate-fade-in ${styles.cartPage}`}>
        <div className={styles.emptyCart}>
          <ShoppingBag size={80} className={styles.emptyIcon} />
          <h2 className={styles.emptyText}>Giỏ hàng của bạn đang trống</h2>
          <Link to="/menu" className="btn btn-primary">Khám phá thực đơn</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`container animate-fade-in ${styles.cartPage}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Giỏ Hàng</h1>
        <p className={styles.itemCount}>Bạn đang có {cartItems.length} sản phẩm trong giỏ</p>
      </div>

      <div className={styles.content}>
        <div className={styles.cartList}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.itemImage} />
              
              <div className={styles.itemDetails}>
                <div className={styles.itemHeader}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <div className={styles.itemPrice}>{formatPrice(item.price * item.quantity)}</div>
                </div>
                
                {item.toppings.length > 0 && (
                  <div className={styles.itemToppings}>
                    Toppings: {item.toppings.join(', ')}
                  </div>
                )}

                <div className={styles.itemActions}>
                  <div className={styles.quantityCtrl}>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={16} />
                    </button>
                    <div className={styles.qtyValue}>{item.quantity}</div>
                    <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={16} />
                    </button>
                  </div>

                  <button className={styles.removeBtn} onClick={() => removeItem(item.id)}>
                    <Trash2 size={18} /> Xoá
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summarySection}>
          <h2 className={styles.summaryTitle}>Tổng Đơn Hàng</h2>
          
          <div className={styles.summaryRow}>
            <span>Tạm tính</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Phí giao hàng</span>
            <span>{formatPrice(shippingFee)}</span>
          </div>
          
          <div className={styles.summaryTotal}>
            <span>Tổng cộng</span>
            <span>{formatPrice(total)}</span>
          </div>

          {(() => {
            const userStr = localStorage.getItem('user');
            const user = userStr ? JSON.parse(userStr) : null;
            const isAdmin = user?.role === 'ADMIN';

            if (isAdmin) {
              return (
                <div style={{ marginTop: '20px', color: '#e74c3c', textAlign: 'center', fontWeight: 'bold', padding: '15px', backgroundColor: '#fdf0ed', borderRadius: '8px' }}>
                  Tài khoản Admin không thể thực hiện đặt hàng.
                </div>
              );
            }

            return (
              <>
                {user && (
                  <div style={{ marginTop: '20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Số điện thoại nhận hàng" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                    <input 
                      type="text" 
                      className="input-field" 
                      placeholder="Địa chỉ nhận hàng (Ví dụ: 123 Lê Lợi, Q.1)" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                )}
                <button className={`btn btn-primary ${styles.checkoutBtn}`} onClick={handleCheckout}>
                  {user ? 'Tiến hành thanh toán' : 'Đăng nhập để thanh toán'}
                </button>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default Cart;
