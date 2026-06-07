import { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, ShoppingCart, Store, Tags, Menu, X } from 'lucide-react';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin');
  const [userRole, setUserRole] = useState('STAFF');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      navigate('/login');
      return;
    }
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'ADMIN' && user.role !== 'STAFF') {
        alert('Bạn không có quyền truy cập trang quản trị!');
        navigate('/');
      } else {
        setAdminName(user.name || 'Admin');
        setUserRole(user.role);
      }
    } catch (e) {
      navigate('/login');
    }
  }, [navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className={styles.adminLayout}>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className={styles.sidebarOverlay} onClick={closeSidebar}></div>
      )}
      
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Xóm<span className="text-primary">Tiếu</span> <span className={styles.badge}>{userRole}</span></h2>
          <button className={styles.closeSidebarBtn} onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>
        <nav className={styles.sidebarNav}>
          <Link to="/admin" className={styles.navItem} onClick={closeSidebar}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/products" className={styles.navItem} onClick={closeSidebar}>
            <ShoppingBag size={20} />
            <span>Sản phẩm</span>
          </Link>
          <Link to="/admin/categories" className={styles.navItem} onClick={closeSidebar}>
            <Tags size={20} />
            <span>Danh mục</span>
          </Link>
          <Link to="/admin/orders" className={styles.navItem} onClick={closeSidebar}>
            <ShoppingCart size={20} />
            <span>Đơn hàng</span>
          </Link>
          {userRole === 'ADMIN' && (
            <Link to="/admin/customers" className={styles.navItem} onClick={closeSidebar}>
              <Users size={20} />
              <span>Người dùng & Khách hàng</span>
            </Link>
          )}
          {userRole === 'ADMIN' && (
            <Link to="#" className={styles.navItem} onClick={closeSidebar}>
              <Settings size={20} />
              <span>Cài đặt</span>
            </Link>
          )}
        </nav>
        <div className={styles.sidebarFooter}>
          <Link to="/" className={styles.navItem} style={{ marginBottom: '0.5rem' }}>
            <Store size={20} />
            <span>Về Cửa hàng</span>
          </Link>
          <button className={styles.logoutBtn} onClick={() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            navigate('/login');
          }}>
            <LogOut size={20} />
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {/* Top Header */}
        <header className={styles.topHeader}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className={styles.mobileMenuBtn} onClick={toggleSidebar}>
              <Menu size={24} />
            </button>
            <div className={styles.breadcrumb}>Dashboard</div>
          </div>
          <div className={styles.adminProfile}>
            <img src="https://ui-avatars.com/api/?name=Admin&background=random" alt="Admin" className={styles.avatar} />
            <span className={styles.adminNameText}>{adminName}</span>
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
