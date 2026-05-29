import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import styles from './Cart.module.css';

// Mock Cart Data
const INITIAL_CART = [
  {
    id: '1',
    productId: '1',
    name: 'Hủ Tiếu Tươi',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?q=80&w=300&auto=format&fit=crop',
    quantity: 2,
    toppings: ['Thêm tóp mỡ', 'Thêm tôm (2 con)']
  },
  {
    id: '2',
    productId: '3',
    name: 'Combo Tươi & Khô',
    price: 120000,
    image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b485d?q=80&w=300&auto=format&fit=crop',
    quantity: 1,
    toppings: []
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(INITIAL_CART);

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

          <button className={`btn btn-primary ${styles.checkoutBtn}`}>
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
