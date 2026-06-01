import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, User, Mail, Phone, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '../../../services/api';
import styles from './OrderDetail.module.css';

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await api.get(`/orders/${id}`);
        setOrder(data);
        setStatus(data.status || 'Chờ xác nhận');
      } catch (error) {
        console.error('Failed to fetch order', error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchOrder();
  }, [id]);

  const handleUpdateStatus = async () => {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      alert('Cập nhật trạng thái thành công!');
      // Update local state to reflect
      setOrder({...order, status});
    } catch (error) {
      alert('Có lỗi xảy ra khi cập nhật.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (isLoading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Đang tải...</div>;
  if (!order) return <div style={{ padding: '5rem', textAlign: 'center' }}>Không tìm thấy đơn hàng</div>;

  return (
    <div className={`animate-fade-in ${styles.orderDetailPage}`}>
      <div className={styles.header}>
        <Link to="/admin/orders" className={styles.backBtn}>
          <ArrowLeft size={20} /> Quay lại danh sách
        </Link>
        <div className={styles.headerTitle}>
          <h1>Chi tiết đơn hàng {order.id.substring(0, 8).toUpperCase()}</h1>
          <span className={styles.date}><Calendar size={16} /> {new Date(order.createdAt).toLocaleString('vi-VN')}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 md-col-1 gap-6">
        <div className={styles.mainCol}>
          {/* Items List */}
          <div className={styles.card}>
            <h2>Danh sách món ăn</h2>
            <div className={styles.itemsList}>
              {order.items?.map((item: any) => (
                <div key={item.id} className={styles.orderItem}>
                  <img src={item.product?.image || 'https://via.placeholder.com/150'} alt={item.product?.name} className={styles.itemImage} />
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.product?.name || 'Sản phẩm'}</div>
                    <div className={styles.itemMeta}>Số lượng: {item.quantity} x {formatPrice(item.price)}</div>
                  </div>
                  <div className={styles.itemTotal}>{formatPrice(item.quantity * item.price)}</div>
                </div>
              ))}
            </div>

            <div className={styles.orderSummary}>
              <div className={styles.summaryRow}>
                <span>Tạm tính:</span>
                <span>{formatPrice(order.subtotal || order.total)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Phí giao hàng:</span>
                <span>{formatPrice(order.total > order.subtotal ? order.total - order.subtotal : 0)}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Tổng thanh toán:</span>
                <span className="text-primary">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sideCol}>
          {/* Order Status */}
          <div className={styles.card}>
            <h2>Trạng thái đơn hàng</h2>
            <div className={styles.formGroup}>
              <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Chờ xác nhận">Chờ xác nhận</option>
                <option value="Đang chuẩn bị">Đang chuẩn bị</option>
                <option value="Đã giao">Đã giao</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={handleUpdateStatus}>
                Cập nhật trạng thái
              </button>
            </div>
          </div>

          {/* Customer Info */}
          <div className={styles.card}>
            <h2>Khách hàng</h2>
            <div className={styles.customerInfo}>
              <div className={styles.infoRow}><User size={16} /> {order.user?.name || 'Khách vãng lai'}</div>
              <div className={styles.infoRow}><Mail size={16} /> {order.user?.email || 'Chưa cung cấp'}</div>
              <div className={styles.infoRow}><Phone size={16} /> {order.phone || 'Chưa cung cấp'}</div>
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
              {order.paymentMethod || 'Thanh toán khi nhận hàng (COD)'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
