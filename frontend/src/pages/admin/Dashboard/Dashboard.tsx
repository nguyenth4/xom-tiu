import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';
import styles from './Dashboard.module.css';

const Dashboard = () => {
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
            <p className={styles.statLabel}>Doanh thu hôm nay</p>
            <h3 className={styles.statValue}>15,240,000đ</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(66, 133, 244, 0.1)', color: '#4285F4' }}>
            <ShoppingBag size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Đơn hàng mới</p>
            <h3 className={styles.statValue}>48</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(251, 192, 45, 0.1)', color: '#FBC02D' }}>
            <TrendingUp size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Tỷ lệ chuyển đổi</p>
            <h3 className={styles.statValue}>3.2%</h3>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statIconWrapper} style={{ backgroundColor: 'rgba(234, 67, 53, 0.1)', color: '#EA4335' }}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <p className={styles.statLabel}>Khách hàng mới</p>
            <h3 className={styles.statValue}>12</h3>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className={styles.sectionContainer}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Đơn hàng gần đây</h2>
          <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>Xem tất cả</button>
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
              <tr>
                <td>#XT-1024</td>
                <td>Nguyễn Văn A</td>
                <td>2x Hủ Tiếu Nam Vang...</td>
                <td>130,000đ</td>
                <td><span className="badge badge-gold">Đang xử lý</span></td>
              </tr>
              <tr>
                <td>#XT-1023</td>
                <td>Trần Thị B</td>
                <td>1x Hủ Tiếu Mực...</td>
                <td>60,000đ</td>
                <td><span className="badge badge-red" style={{ backgroundColor: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>Hoàn thành</span></td>
              </tr>
              <tr>
                <td>#XT-1022</td>
                <td>Lê Hoàng C</td>
                <td>3x Hủ Tiếu Khô...</td>
                <td>225,000đ</td>
                <td><span className="badge badge-red" style={{ backgroundColor: 'rgba(52, 168, 83, 0.1)', color: '#34A853' }}>Hoàn thành</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
