import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, Search, Phone, ChevronDown, ChevronUp, LayoutDashboard } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { api } from '../../services/api';
import styles from './ClientLayout.module.css';

const ClientLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [categories, setCategories] = useState<{id: number, name: string}[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<{name: string, email: string, role?: string} | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          const cart = JSON.parse(savedCart);
          setCartCount(cart.reduce((sum: number, item: any) => sum + item.quantity, 0));
        } catch (e) {
          setCartCount(0);
        }
      } else {
        setCartCount(0);
      }
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (e) {}
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.get('/categories');
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories in layout', err);
      }
    };
    fetchCategories();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  };

  return (
    <div className={styles.layout}>   
      {/* Header Wrapper */}
      <div className={styles.headerWrapper}>
        {/* Top Bar */}
        <div className={styles.topBar}>
          <div className={`container ${styles.topBarContainer}`}>
            <div className={styles.topBarLeft}>
              <Phone size={14} className={styles.phoneIcon} />
              <span><span className={styles.topBarText}>Hotline: </span>0854.576.340</span>
            </div>
            <div className={styles.topBarRight}>
              <button className={styles.topBarBtn}>
                <Search size={14} />
                <span className={styles.topBarText}>Tìm kiếm</span>
              </button>
              {user?.role === 'ADMIN' && (
                <Link to="/admin" className={styles.topBarBtn} style={{ color: 'var(--color-primary-red)', fontWeight: 'bold' }}>
                  <LayoutDashboard size={14} />
                  <span className={styles.topBarText} style={{ color: 'var(--color-primary-red)' }}>Trang Quản trị</span>
                </Link>
              )}
              {user ? (
                <div className={styles.topBarBtn} style={{ cursor: 'default' }}>
                  <User size={14} />
                  <span className={styles.topBarText}>Xin chào, {user.name}</span>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('user');
                      localStorage.removeItem('token');
                      setUser(null);
                      navigate('/login');
                    }}
                    style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline' }}
                  >
                    Thoát
                  </button>
                </div>
              ) : (
                <Link to="/login" className={styles.topBarBtn}>
                  <User size={14} />
                  <span className={styles.topBarText}>Tài khoản</span>
                </Link>
              )}
              <Link to="/cart" className={styles.topBarBtn}>
                <ShoppingCart size={14} />
                <span className={styles.topBarText}>Giỏ hàng</span>
                {cartCount > 0 && <span className={styles.cartBadgeTop}>{cartCount}</span>}
              </Link>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header className={`${styles.header} glass-panel`}>
          <div className={`container ${styles.headerContainer}`}>
            {/* Mobile Menu Icon */}
            <button className={`${styles.iconBtn} ${styles.mobileOnly}`} onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Desktop Left Nav */}
            <nav className={styles.navDesktopLeft}>
              <Link to="/" className={styles.navLink}>Trang Chủ</Link>
              <Link to="/about" className={styles.navLink}>Giới Thiệu</Link>
              <div className={styles.navItem}>
                <Link to="/menu" className={styles.navLink}>Sản Phẩm <span className={styles.chevron}>▾</span></Link>
                {categories.length > 0 && (
                  <div className={styles.dropdownMenu}>
                    {categories.map(cat => (
                      <Link key={cat.id} to={`/menu?category=${encodeURIComponent(cat.name)}`} className={styles.dropdownItem}>
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {/* Center Logo */}
            <Link to="/" className={styles.logoCenter} onClick={closeMobileMenu}>
              Xóm<span className="text-primary">Tíu</span>
            </Link>

            {/* Desktop Right Nav */}
            <nav className={styles.navDesktopRight}>
              <Link to="/feed" className={styles.navLink}>Chuyện Xóm Tíu</Link>
              <Link to="/activities" className={styles.navLink}>Hoạt Động</Link>
              <Link to="/customer-service" className={styles.navLink}>Chăm Sóc Khách Hàng</Link>
            </nav>

            {/* Mobile Right Actions */}
            <div className={styles.mobileActions}>
              <button className={styles.iconBtn}>
                <Search size={22} />
              </button>
              <Link to="/cart" className={styles.cartBtn} onClick={closeMobileMenu}>
                <ShoppingCart size={22} />
                {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
              </Link>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <nav className={styles.navMobile}>
            <Link to="/" className={styles.mobileNavLink} onClick={closeMobileMenu}>Trang chủ</Link>
            <div 
              className={styles.mobileNavLink} 
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
              onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
            >
              Tất cả sản phẩm
              {isMobileProductsOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
            
            {isMobileProductsOpen && (
              <div className={styles.mobileSubmenu}>
                <Link to="/menu" className={styles.mobileNavLink} style={{ paddingLeft: '2.5rem', fontSize: '1rem' }} onClick={closeMobileMenu}>
                  - Xem tất cả
                </Link>
                {categories.map(cat => (
                  <Link 
                    key={cat.id} 
                    to={`/menu?category=${encodeURIComponent(cat.name)}`} 
                    className={styles.mobileNavLink} 
                    style={{ paddingLeft: '2.5rem', fontSize: '1rem' }}
                    onClick={closeMobileMenu}
                  >
                    - {cat.name}
                  </Link>
                ))}
              </div>
            )}
            <Link to="/about" className={styles.mobileNavLink} onClick={closeMobileMenu}>Về chúng tôi</Link>
            <Link to="/feed" className={styles.mobileNavLink} onClick={closeMobileMenu}>Chuyện Xóm Tíu</Link>
            <Link to="/activities" className={styles.mobileNavLink} onClick={closeMobileMenu}>Hoạt Động</Link>
            <Link to="/customer-service" className={styles.mobileNavLink} onClick={closeMobileMenu}>Chăm sóc khách hàng</Link>
          </nav>
        )}
      </div>

      {/* Main Content */}
      <main className={styles.main}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.newsletterSection}>
            <div className={styles.newsletterContent}>
              <h4>ĐĂNG KÝ NHẬN TIN</h4>
              <p>Đừng bỏ lỡ:</p>
              <ul>
                <li>Các chương trình ưu đãi hấp dẫn</li>
                <li>Công thức món ngon từ hủ tiếu rau củ</li>
                <li>Bí quyết ăn sạch – sống khỏe</li>
                <li>Những câu chuyện đậm chất miền Tây từ Xóm Tíu</li>
              </ul>
              <p className={styles.newsletterHighlight}>➡ Đăng ký ngay để đồng hành cùng Xóm Tíu trên hành trình lan tỏa hương vị quê hương.</p>
            </div>
            <div className={styles.newsletterForm}>
              <input type="email" placeholder="Nhập email của bạn..." className={styles.newsletterInput} />
              <button className="btn btn-primary">Đăng ký</button>
            </div>
          </div>
        </div>

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
              <li><Link to="/customer-service">Chăm sóc khách hàng</Link></li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Thông tin</h4>
            <ul>
              <li><span className="text-muted">Hotline / Zalo:</span> 0854576340</li>
              <li><span className="text-muted">Địa chỉ:</span> Làng nghề hủ tiếu Sáu Hoài, Quận Cái Răng, TP. Cần Thơ</li>
              <li><span className="text-muted">Thời gian làm việc:</span> 8:00 AM – 9:00 PM</li>
              <li><span className="text-muted">Email:</span> xomtiu@gmail.com</li>
            </ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Kênh truyền thông</h4>
            <ul className={styles.socialLinks}>
              <li><a href="https://www.facebook.com/profile.php?id=61582241639025&locale=vi_VN" target="_blank" rel="noopener noreferrer"><FaFacebookF size={20} /></a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram size={20} /></a></li>
              <li><a href="#" target="_blank" rel="noopener noreferrer"><FaTiktok size={20} /></a></li>
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
