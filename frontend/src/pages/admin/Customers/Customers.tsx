import { useState } from 'react';
import { Search, Mail, Phone, MoreHorizontal } from 'lucide-react';
import styles from './Customers.module.css';

interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: string;
  avatar: string;
}

const MOCK_CUSTOMERS: CustomerData[] = [
  { id: 'CUS-01', name: 'Nguyễn Văn A', email: 'nguyenvana@example.com', phone: '0901234567', totalOrders: 5, totalSpent: '450,000đ', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 'CUS-02', name: 'Trần Thị B', email: 'tranthib@example.com', phone: '0987654321', totalOrders: 2, totalSpent: '130,000đ', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 'CUS-03', name: 'Lê Hoàng C', email: 'lehoangc@example.com', phone: '0912345678', totalOrders: 1, totalSpent: '250,000đ', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 'CUS-04', name: 'Phạm Văn D', email: 'phamvand@example.com', phone: '0933445566', totalOrders: 10, totalSpent: '1,200,000đ', avatar: 'https://i.pravatar.cc/150?img=12' },
];

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = MOCK_CUSTOMERS.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm)
  );

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
              <th className="text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.id}>
                <td>
                  <div className={styles.customerCell}>
                    <img src={customer.avatar} alt={customer.name} className={styles.avatar} />
                    <div>
                      <div className={styles.customerName}>{customer.name}</div>
                      <div className={styles.customerId}>{customer.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className={styles.contactInfo}>
                    <span className="flex items-center gap-2 text-muted"><Mail size={14} /> {customer.email}</span>
                    <span className="flex items-center gap-2 text-muted"><Phone size={14} /> {customer.phone}</span>
                  </div>
                </td>
                <td className="text-center font-bold">{customer.totalOrders}</td>
                <td className="font-bold text-primary">{customer.totalSpent}</td>
                <td>
                  <div className={styles.actionButtons}>
                    <button className={styles.actionBtnView} title="Thêm tùy chọn">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredCustomers.length === 0 && (
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
