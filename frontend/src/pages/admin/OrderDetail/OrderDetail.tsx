import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Mail, Phone, Calendar } from 'lucide-react';
import styles from './OrderDetail.module.css';

// Mock data
const MOCK_ORDER = {
  id: 'ORD-1001',
  date: '29/05/2026 - 14:30',
  status: 'Chờ xác nhận',
  paymentMethod: 'Thanh toán khi nhận hàng (COD)',
  customer: {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
  },
  shippingAddress: '123 Đường Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM',
  items: [
    { id: 1, name: 'Hủ Tiếu Tươi Đặc Biệt', quantity: 2, price: '85,000đ', total: '170,000đ', image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?q=80&w=200&auto=format&fit=crop' },
    { id: 2, name: 'Trà Đá Thảo Mộc', quantity: 2, price: '15,000đ', total: '30,000đ', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=200&auto=format&fit=crop' },
  ],
  subtotal: '200,000đ',
  shippingFee: '20,000đ',
  total: '220,000đ'
};

const OrderDetail = () => {
  const { id } = useParams();
  
  // In a real app, fetch order by id. Here we just use mock.
  const order = MOCK_ORDER;

  return (
    <div className={`animate-fade-in ${styles.orderDetailPage}`}>
      <div className={styles.header}>
        <Link to="/admin/orders" className={styles.backBtn}>
          <ArrowLeft size={20} /> Quay lại danh sách
        </Link>
        <div className={styles.headerTitle}>
          <h1>Chi tiết đơn hàng {order.id}</h1>
          <span className={styles.date}><Calendar size={16} /> {order.date}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 md-col-1 gap-6">
        <div className={styles.mainCol}>
          {/* Items List */}
          <div className={styles.card}>
            <h2>Danh sách món ăn</h2>
            <div className={styles.itemsList}>
              {order.items.map(item => (
                <div key={item.id} className={styles.orderItem}>
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemMeta}>Số lượng: {item.quantity} x {item.price}</div>
                  </div>
                  <div className={styles.itemTotal}>{item.total}</div>
                </div>
              ))}
            </div>

            <div className={styles.orderSummary}>
              <div className={styles.summaryRow}>
                <span>Tạm tính:</span>
                <span>{order.subtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Phí giao hàng:</span>
                <span>{order.shippingFee}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Tổng thanh toán:</span>
                <span className="text-primary">{order.total}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          {/* Order Status */}
          <div className={styles.card}>
            <h2>Trạng thái đơn hàng</h2>
            <div className={styles.formGroup}>
              <select className="input-field" defaultValue={order.status}>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đang chuẩn bị">Đang chuẩn bị</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                Cập nhật trạng thái
              </button>
            </div>
          </div>

          {/* Customer Info */}
          <div className={styles.card}>
            <h2>Khách hàng</h2>
            <div className={styles.customerInfo}>
              <div className={styles.infoRow}><User size={16} /> {order.customer.name}</div>
              <div className={styles.infoRow}><Mail size={16} /> {order.customer.email}</div>
              <div className={styles.infoRow}><Phone size={16} /> {order.customer.phone}</div>
            </div>
          </div>

          {/* Shipping Info */}
          <div className={styles.card}>
            <h2>Giao hàng</h2>
            <div className={styles.customerInfo}>
              <div className={styles.infoRow} style={{ alignItems: 'flex-start' }}>
                <MapPin size={16} style={{ marginTop: '0.25rem', flexShrink: 0 }} /> 
                <span>{order.shippingAddress}</span>
              </div>
            </div>
            <div className={styles.paymentMethod}>
              <strong>Phương thức thanh toán:</strong><br />
              {order.paymentMethod}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
