import { useState, useEffect } from 'react';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Dashboard.module.css';
import { api } from '../../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState<any>({ totalRevenue: 0, totalOrders: 0, totalUsers: 0, revenueData: [] });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const analyticsData = await api.get('/orders/analytics');
        setStats(analyticsData);
        
        const ordersData = await api.get('/orders');
        // Sort by newest first, take top 5
        const sortedOrders = ordersData.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setRecentOrders(sortedOrders.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (loading) {
    return <div className={styles.loadingContainer}>Đang tải dữ liệu...</div>;
  }

  return (
    <div className="animate-fade-in">
      <h1 className={styles.pageTitle}>Tổng quan hệ thống</h1>
      
      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>
            <DollarSign size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Tổng doanh thu (Đã giao)</p>
            <h3 className={styles.statValue}>{formatPrice(stats.totalRevenue)}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(66, 133, 244, 0.1)', color: '#4285F4' }}>
            <ShoppingBag size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Tổng đơn hàng</p>
            <h3 className={styles.statValue}>{stats.totalOrders}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(234, 67, 53, 0.1)', color: '#EA4335' }}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Khách hàng đăng ký</p>
            <h3 className={styles.statValue}>{stats.totalUsers}</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(251, 192, 45, 0.1)', color: '#FBC02D' }}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Doanh thu TB/Đơn</p>
            <h3 className={styles.statValue}>
              {stats.totalOrders > 0 ? formatPrice(stats.totalRevenue / stats.totalOrders) : '0đ'}
            </h3>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className={styles.sectionContainer} style={{ marginTop: '2rem', padding: '1.5rem' }}>
        <h2 className={styles.sectionTitle} style={{ marginBottom: '1.5rem' }}>Doanh thu 7 ngày gần nhất</h2>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <BarChart data={stats.revenueData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis 
                tickFormatter={(value) => `${value / 1000}k`} 
                axisLine={false} 
                tickLine={false}
              />
              <Tooltip formatter={(value: any) => formatPrice(value)} />
              <Bar dataKey="revenue" fill="#D4AF37" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className={styles.sectionContainer} style={{ marginTop: '2rem' }}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Đơn hàng gần đây</h2>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Khách hàng</th>
                <th>Sản phẩm</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id.slice(0, 8)}</td>
                  <td>{order.user?.name || 'Khách vãng lai'}</td>
                  <td>{order.items?.length || 0} sản phẩm</td>
                  <td>{formatPrice(order.total)}</td>
                  <td>
                    <span className={`badge ${order.status === 'Đã giao' ? 'badge-red' : 'badge-gold'}`} style={order.status === 'Đã giao' ? { backgroundColor: 'rgba(52, 168, 83, 0.1)', color: '#34A853' } : {}}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center' }}>Chưa có đơn hàng nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
