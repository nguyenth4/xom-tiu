import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Eye, Filter } from 'lucide-react';
import styles from './Orders.module.css';
import { api } from '../../../services/api';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await api.get('/orders');
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => 
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Chờ xác nhận': return styles.statusPending;
      case 'Đang chuẩn bị': return styles.statusProcessing;
      case 'Đã giao': return styles.statusCompleted;
      case 'Đã hủy': return styles.statusCancelled;
      default: return '';
    }
  };

  return (
    <div className={`animate-fade-in ${styles.adminOrdersPage}`}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Quản lý Đơn hàng</h1>
          <p className="text-muted">Theo dõi và xử lý các đơn đặt hàng từ khách.</p>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Tìm theo mã đơn hoặc tên khách..." 
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-outline" style={{ background: 'white' }}>
          <Filter size={20} /> Lọc
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Mã đơn</th>
              <th>Khách hàng</th>
              <th>Ngày đặt</th>
              <th>Tổng tiền</th>
              <th>Trạng thái</th>
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={6} className="text-center" style={{ padding: '3rem' }}>Đang tải dữ liệu...</td></tr>
            ) : filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="font-bold">{order.id.substring(0, 8).toUpperCase()}</td>
                <td>{order.user?.name || 'Khách vãng lai'}</td>
                <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                <td className="font-bold">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total)}</td>
                <td>
                  <span className={`${styles.statusBadge} ${getStatusClass(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionButtons}>
                    <Link to={`/admin/orders/${order.id}`} className={styles.actionBtnView} title="Xem chi tiết">
                      <Eye size={18} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {!isLoading && filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center" style={{ padding: '3rem' }}>
                  Không tìm thấy đơn hàng nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;
