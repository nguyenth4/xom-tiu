import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import styles from './Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState<{name: string, email: string} | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    
    const fetchOrders = async () => {
      try {
        const data = await api.get('/orders/my-orders');
        setOrders(data);
      } catch (err) {
        console.error('Lỗi khi lấy đơn hàng', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Chờ xác nhận': return <span className={`${styles.badge} ${styles.badgeWarning}`}>Chờ xác nhận</span>;
      case 'Đang chuẩn bị': return <span className={`${styles.badge} ${styles.badgeInfo}`}>Đang chuẩn bị</span>;
      case 'Đang giao': return <span className={`${styles.badge} ${styles.badgePrimary}`}>Đang giao</span>;
      case 'Đã giao': return <span className={`${styles.badge} ${styles.badgeSuccess}`}>Đã giao</span>;
      case 'Đã hủy': return <span className={`${styles.badge} ${styles.badgeDanger}`}>Đã hủy</span>;
      default: return <span className={`${styles.badge}`}>{status}</span>;
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Đang tải dữ liệu...</div>;
  }

  if (!user) {
    return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Vui lòng đăng nhập để xem thông tin</div>;
  }

  return (
    <div className={`container animate-fade-in ${styles.profilePage}`}>
      <h1 className={styles.pageTitle}>Tài Khoản Của Tôi</h1>
      
      <div className={styles.grid}>
        <div className={styles.sidebar}>
          <div className={styles.userInfoCard}>
            <div className={styles.avatar}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
        </div>
        
        <div className={styles.mainContent}>
          <div className={styles.ordersCard}>
            <h2 className={styles.sectionTitle}>Lịch Sử Đơn Hàng</h2>
            
            {orders.length === 0 ? (
              <div className={styles.emptyOrders}>
                <p>Bạn chưa có đơn hàng nào.</p>
              </div>
            ) : (
              <div className={styles.ordersList}>
                {orders.map(order => (
                  <div key={order.id} className={styles.orderItem}>
                    <div className={styles.orderHeader}>
                      <div>
                        <span className={styles.orderId}>Mã ĐH: #{order.id.slice(0, 8)}</span>
                        <span className={styles.orderDate}>
                          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>
                    
                    <div className={styles.orderDetails}>
                      {order.items.map((item: any) => (
                        <div key={item.id} className={styles.productRow}>
                          <span className={styles.productName}>{item.product?.name || 'Sản phẩm'} <span className={styles.qty}>x{item.quantity}</span></span>
                          <span className={styles.productPrice}>{formatPrice(item.price)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className={styles.orderFooter}>
                      <span className={styles.totalLabel}>Tổng tiền:</span>
                      <span className={styles.totalAmount}>{formatPrice(order.total)}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
