import { Outlet, Link } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, ShoppingCart, Store, Tags } from 'lucide-react';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  return (
    <div className={styles.adminLayout}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Xóm<span className="text-primary">Tiếu</span> <span className={styles.badge}>Admin</span></h2>
        </div>
        <nav className={styles.sidebarNav}>
          <Link to="/admin" className={styles.navItem}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/products" className={styles.navItem}>
            <ShoppingBag size={20} />
            <span>Sản phẩm</span>
          </Link>
          <Link to="/admin/categories" className={styles.navItem}>
            <Tags size={20} />
            <span>Danh mục</span>
          </Link>
          <Link to="/admin/orders" className={styles.navItem}>
            <ShoppingCart size={20} />
            <span>Đơn hàng</span>
          </Link>
          <Link to="/admin/customers" className={styles.navItem}>
            <Users size={20} />
            <span>Khách hàng</span>
          </Link>
          <Link to="#" className={styles.navItem}>
            <Settings size={20} />
            <span>Cài đặt</span>
          </Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.navItem} style={{ marginBottom: '0.5rem' }}>
            <Store size={20} />
            <span>Về Cửa hàng</span>
          </Link>
          <button className={styles.logoutBtn}>
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <div className={styles.breadcrumb}>Dashboard</div>
          <div className={styles.adminProfile}>
            <img src="https://i.pravatar.cc/150?img=11" alt="Admin" className={styles.avatar} />
            <span>Admin</span>
          </div>
        </header>

        {/* Content Area */}
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
