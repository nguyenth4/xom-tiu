import { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Flame, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { api } from '../../../services/api';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.get('/products');
        // Chỉ lấy 3 sản phẩm nổi bật
        setProducts(data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroSubtitle}>Ẩm thực Việt Nam</span>
            <h1 className={styles.heroTitle}>
              Tinh Hoa <span className="text-primary">Hủ Tiếu</span> Truyền Thống
            </h1>
            <p className={styles.heroText}>
              Thơm Tình Xóm Nhỏ - Đậm Vị Quê Hương
            </p>
            <div className={styles.heroActions}>
              <Link to="/menu" className="btn btn-primary">
                Đặt món ngay <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-outline">
                Câu chuyện
              </Link>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageDecor}></div>
            <img
              src="https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?q=80&w=1200&auto=format&fit=crop"
              alt="Hủ tiếu truyền thống"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Món Ngon Xóm <span className="text-primary">Tiếu</span></h2>
            <p className={styles.sectionDesc}>Những tinh túy được yêu thích nhất từ gian bếp của chúng tôi.</p>
          </div>

          <div className={`grid grid-cols-3 md-col-1 ${styles.productGrid}`}>
            {isLoading ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem' }}>Đang tải dữ liệu...</div>
            ) : products.map((product) => (
              <Link to={`/menu/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.productImageWrapper}>
                  {product.category?.name === 'Combo' && <span className={styles.productTag}>Tiết kiệm</span>}
                  <img src={product.image} alt={product.name} className={styles.productImg} />
                  <div className={styles.productOverlay}>
                    <button className="btn btn-primary">Thêm vào giỏ</button>
                  </div>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productPrice}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center" style={{ marginTop: '3rem' }}>
            <Link to="/menu" className="btn btn-outline">
              Xem toàn bộ thực đơn
            </Link>
          </div>
        </div>
      </section>

      {/* Banner / Value Section */}
      <section className={styles.values}>
        <div className={`container ${styles.valuesContainer}`}>
          <div className={styles.valueItem}>
            <div className={styles.valueIcon}>
              <Leaf size={48} strokeWidth={1.5} />
            </div>
            <h3 className={styles.valueTitle}>Nguyên liệu tươi sạch</h3>
            <p className={styles.valueDesc}>Tuyển chọn kỹ lưỡng mỗi ngày từ nông trại địa phương.</p>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueIcon}>
              <Flame size={48} strokeWidth={1.5} />
            </div>
            <h3 className={styles.valueTitle}>Công thức gia truyền</h3>
            <p className={styles.valueDesc}>Giữ trọn hương vị nguyên bản qua nhiều thế hệ.</p>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueIcon}>
              <Timer size={48} strokeWidth={1.5} />
            </div>
            <h3 className={styles.valueTitle}>Giao hàng siêu tốc</h3>
            <p className={styles.valueDesc}>Nóng hổi đến tay bạn chỉ trong vòng 30 phút.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
