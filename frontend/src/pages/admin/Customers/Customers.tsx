import { useState, useEffect } from 'react';
import { Search, Mail, Phone, MoreHorizontal } from 'lucide-react';
import { api } from '../../../services/api';
import styles from './Customers.module.css';

interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  avatar?: string;
  role: string;
}

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customers, setCustomers] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const data = await api.get('/users');
        setCustomers(data);
      } catch (err) {
        console.error('Failed to fetch customers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer => 
    (customer.name && customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (customer.phone && customer.phone.includes(searchTerm)) ||
    (customer.email && customer.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!window.confirm(`Bạn có chắc chắn thay đổi quyền của người dùng này thành ${newRole}?`)) return;
    try {
      await api.patch(`/users/${userId}`, { role: newRole });
      setCustomers(customers.map(c => c.id === userId ? { ...c, role: newRole } : c));
      alert('Đã cập nhật quyền thành công!');
    } catch (err) {
      alert('Lỗi khi cập nhật quyền');
    }
  };

  return (
    <div className={`animate-fade-in ${styles.adminCustomersPage}`}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.title}>Quản lý Khách hàng</h1>
          <p className="text-muted">Xem thông tin và lịch sử mua hàng của khách hàng.</p>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Search size={20} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Tìm theo tên hoặc số điện thoại..." 
            className="input-field"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Liên hệ</th>
              <th className="text-center">Số đơn hàng</th>
              <th>Tổng chi tiêu</th>
              <th>Quyền (Role)</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center" style={{ padding: '3rem' }}>Đang tải dữ liệu...</td>
              </tr>
            ) : filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className={styles.customerCell}>
                      <img 
                        src={customer.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(customer.name || customer.email)}&background=random`} 
                        alt={customer.name} 
                        className={styles.avatar} 
                      />
                      <div>
                        <div className={styles.customerName}>
                          {customer.name || 'Chưa cập nhật'}
                          {customer.role === 'ADMIN' && <span style={{ marginLeft: '8px', fontSize: '10px', backgroundColor: '#e74c3c', color: 'white', padding: '2px 6px', borderRadius: '4px' }}>ADMIN</span>}
                        </div>
                        <div className={styles.customerId} style={{ fontSize: '0.75rem' }}>{customer.id.substring(0, 8)}...</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className={styles.contactInfo}>
                      <span className="flex items-center gap-2 text-muted"><Mail size={14} /> {customer.email}</span>
                      <span className="flex items-center gap-2 text-muted"><Phone size={14} /> {customer.phone || 'Chưa cập nhật'}</span>
                    </div>
                  </td>
                  <td className="text-center font-bold">{customer.totalOrders}</td>
                  <td className="font-bold text-primary">{formatPrice(customer.totalSpent)}</td>
                  <td>
                    <select 
                      value={customer.role}
                      onChange={(e) => handleRoleChange(customer.id, e.target.value)}
                      className="input-field"
                      style={{ padding: '0.25rem 0.5rem', height: 'auto', fontSize: '0.875rem' }}
                    >
                      <option value="CUSTOMER">Khách hàng</option>
                      <option value="STAFF">Nhân viên</option>
                      <option value="ADMIN">Quản trị viên</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center" style={{ padding: '3rem' }}>
                  Không tìm thấy khách hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCustomers;
