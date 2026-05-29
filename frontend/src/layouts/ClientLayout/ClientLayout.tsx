import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search } from 'lucide-react';
import styles from './ClientLayout.module.css';

const ClientLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className={styles.layout}>
      {/* Header */}
      <header className={`${styles.header} glass-panel`}>
        <div className={`container ${styles.headerContainer}`}>
          {/* Mobile Menu Icon */}
          <button className={`${styles.iconBtn} ${styles.mobileOnly}`} onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className={styles.logo} onClick={closeMobileMenu}>
            Xóm<span className="text-primary">Tíu</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className={styles.navDesktop}>
            <Link to="/" className={styles.navLink}>Trang chủ</Link>
            <Link to="/menu" className={styles.navLink}>Thực đơn</Link>
            <Link to="/about" className={styles.navLink}>Về chúng tôi</Link>
            <Link to="/contact" className={styles.navLink}>Liên hệ</Link>
          </nav>

          {/* Right Actions */}
          <div className={styles.actions}>
            <button className={`${styles.iconBtn} ${styles.hideMobile}`}>
              <Search size={22} />
            </button>
            <Link to="/login" className={`${styles.iconBtn} ${styles.hideMobile}`} onClick={closeMobileMenu}>
              <User size={22} />
            </Link>
            <Link to="/cart" className={styles.cartBtn} onClick={closeMobileMenu}>
              <ShoppingCart size={22} />
              <span className={styles.cartCount}>2</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <nav className={styles.navMobile}>
            <Link to="/" className={styles.mobileNavLink} onClick={closeMobileMenu}>Trang chủ</Link>
            <Link to="/menu" className={styles.mobileNavLink} onClick={closeMobileMenu}>Thực đơn</Link>
            <Link to="/about" className={styles.mobileNavLink} onClick={closeMobileMenu}>Về chúng tôi</Link>
            <Link to="/contact" className={styles.mobileNavLink} onClick={closeMobileMenu}>Liên hệ</Link>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={`container ${styles.footerGrid}`}>
          <div className={styles.footerCol}>
            <h3 className={styles.footerLogo}>Xóm<span className="text-primary">Tíu</span></h3>
            <p className="text-muted">Hương vị truyền thống, đậm đà bản sắc Việt. Thưởng thức tô hủ tiếu nóng hổi, trọn vẹn tinh hoa ẩm thực.</p>
          </div>
          <div className={styles.footerCol}>
            <h4>Liên kết nhanh</h4>
            <ul>
              <li><Link to="/menu">Thực đơn</Link></li>
              <li><Link to="/about">Câu chuyện</Link></li>
              <li><Link to="/contact">Liên hệ</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Thông tin</h4>
            <ul>
              <li><span className="text-muted">Hotline:</span> 1900 xxxx</li>
              <li><span className="text-muted">Địa chỉ:</span> 123 Đường Nguyễn Huệ, Q1, TP.HCM</li>
            </ul>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>© 2026 XómTíu. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default ClientLayout;
