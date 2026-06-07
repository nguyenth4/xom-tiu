import { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Flame, Timer, PhoneCall, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import { api } from '../../../services/api';

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodData, catData] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(prodData.slice(0, 3));
        setCategories(catData.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <span className={styles.heroSubtitle}>Ẩm thực Việt Nam</span>
            <h1 className={styles.heroTitle}>
              Tinh Hoa <span className="text-primary">Hủ Tiếu</span> Truyền Thống
            </h1>
            <p className={styles.heroText}>
              Thưởng thức tô hủ tiếu rau củ nóng hổi, trọn vẹn tinh hoa ẩm thực miền Tây. Ăn sạch – Sống xanh – Giữ trọn vị quê hương.
            </p>
            <div className={styles.heroActions}>
              <Link to="/menu" className="btn btn-primary">
                Đặt món ngay <ArrowRight size={18} />
              </Link>
              <Link to="/about" className="btn btn-outline">
                Khám phá câu chuyện
              </Link>
            </div>
          </div>
          <div className={styles.heroImageWrapper}>
            <div className={styles.heroImageDecor}></div>
            <img
              src="/images/banner.png"
              alt="Hủ tiếu truyền thống"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      {/* 2. Story Section */}
      <section className={styles.storySection}>
        <div className={`container ${styles.storyGrid}`}>
          <div>
            <img src="/images/hu-tieu-mix.png" alt="Câu chuyện Xóm Tíu" className={styles.storyImage} />
          </div>
          <div className={styles.storyContent}>
            <h2>Khởi Nguồn Từ Sự Chân Thật</h2>
            <p>
              Xóm Tíu ra đời với mong muốn mang đến những sản phẩm hủ tiếu rau củ sạch, tự nhiên và an toàn cho sức khỏe, được sản xuất từ làng nghề truyền thống Sáu Hoài – Cái Răng – Cần Thơ.
            </p>
            <p>
              Từ những nguyên liệu tự nhiên như bí đỏ, cà rốt, rau dền, cải xanh, hoa đậu biếc… Xóm Tíu tạo nên những sợi hủ tiếu nhiều màu sắc hoàn toàn tự nhiên, không phẩm màu, không chất bảo quản nhưng vẫn giữ được độ dai mềm và hương thơm đặc trưng của gạo mới miền Tây.
            </p>
            <Link to="/about" className="btn btn-outline" style={{ marginTop: '1rem' }}>Xem chi tiết</Link>
          </div>
        </div>
      </section>

      {/* 3. Process Section */}
      <section className={styles.processSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Quy Trình <span className="text-primary">Chế Biến</span></h2>
            <p className={styles.sectionDesc}>Từ nông trại đến bàn ăn, mỗi công đoạn đều được thực hiện với tình yêu và sự tỉ mỉ.</p>
          </div>
          <div className={styles.processPhase}>
            <div className={styles.processGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              <div className={styles.processItem}>
                <div className={styles.processIconWrapper}>1</div>
                <h3 className={styles.processTitle}>Chọn nguyên liệu tự nhiên</h3>
                <p className={styles.processDesc}>Sử dụng gạo tuyển chọn kết hợp cùng các loại rau củ tươi như: khoai tây, củ dền, trái gấc, lá cẩm, hoa đậu biếc, thanh long.</p>
                <div className={styles.processTags}>
                  <h4 style={{ textAlign: 'center', marginBottom: '0.75rem', color: 'var(--color-primary-red)', fontWeight: 700 }}>Cam Kết Từ Xóm Tíu</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--color-primary-red)"/> 100% màu tự nhiên</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--color-primary-red)"/> Không chất bảo quản</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--color-primary-red)"/> Không phẩm màu công nghiệp</span>
                  </div>
                </div>
              </div>
              <div className={styles.processItem}>
                <div className={styles.processIconWrapper}>2</div>
                <h3 className={styles.processTitle}>Xay và phối trộn bột</h3>
                <p className={styles.processDesc}>Gạo được xay mịn, sau đó phối trộn cùng nước ép rau củ để tạo nên những sợi hủ tiếu nhiều màu sắc tự nhiên nhưng vẫn giữ được độ dai mềm đặc trưng.</p>
              </div>
            </div>
          </div>

          <h3 className={styles.phaseTitle}>CÁC CÔNG ĐOẠN CHẾ BIẾN NÊN SỢI HỦ TIẾU</h3>
          
          <div className={styles.processPhase}>
            <div className={styles.processGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              <div className={styles.processItem}>
                <div className={styles.processIconWrapper}>3</div>
                <h3 className={styles.processTitle}>Tráng bánh thủ công</h3>
                <p className={styles.processDesc}>Bột được tráng thành từng lớp mỏng trên xửng hấp theo phương pháp truyền thống tại làng nghề, giúp hình thành nên những mảng bánh hủ tiếu mỏng.</p>
              </div>
              <div className={styles.processItem}>
                <div className={styles.processIconWrapper}>4</div>
                <h3 className={styles.processTitle}>Phơi</h3>
                <p className={styles.processDesc}>Bánh hủ tiếu sau khi được tráng thì đem phơi dưới ánh nắng tự nhiên trong khoảng 1 ngày để bánh hủ tiếu khô lại.</p>
              </div>
              <div className={styles.processItem}>
                <div className={styles.processIconWrapper}>5</div>
                <h3 className={styles.processTitle}>Cắt sợi & xử lý thành phẩm</h3>
                <p className={styles.processDesc}>Sau khi phơi khô, bánh được cắt thành sợi với độ dày vừa phải, đảm bảo dai mềm tự nhiên, không bở khi nấu và dễ chế biến.</p>
              </div>
            </div>
          </div>

          <h3 className={styles.phaseTitle}>PHÂN LOẠI VÀ ĐÓNG GÓI</h3>
          
          <div className={styles.processPhase}>
            <div className={styles.processGrid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              <div className={styles.processItem}>
                <div className={styles.processIconWrapper}>6</div>
                <h3 className={styles.processTitle}>Phân loại sản phẩm</h3>
                <div className={styles.subCategoryBox}>
                  <div className={styles.subCategoryItem}>
                    <strong>Hủ tiếu tươi</strong> 
                    <span>Mềm dai tự nhiên • Thích hợp dùng ngay • Phù hợp món nước/xào</span>
                  </div>
                  <div className={styles.subCategoryItem}>
                    <strong>Hủ tiếu khô</strong>
                    <span>Được sấy & đóng gói • Dễ bảo quản, mang đi xa • Giữ trọn vị truyền thống</span>
                  </div>
                </div>
              </div>
              <div className={styles.processItem}>
                <div className={styles.processIconWrapper}>7</div>
                <h3 className={styles.processTitle}>Đóng gói & giao hàng</h3>
                <p className={styles.processDesc}>Sản phẩm đóng gói sạch sẽ, hút chân không và kiểm tra kỹ trước khi giao nhằm đảm bảo: an toàn vệ sinh, giữ độ tươi ngon, thuận tiện bảo quản.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Categories */}
      <section className={styles.categorySection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Danh Mục <span className="text-primary">Nổi Bật</span></h2>
            <p className={styles.sectionDesc}>Lựa chọn nhanh những hương vị được yêu thích nhất.</p>
          </div>
          <div className={styles.categoryGrid}>
            {categories.map((cat, idx) => (
              <Link key={cat.id} to={`/menu?category=${cat.name}`} className={styles.categoryCard}>
                <img 
                  src={idx === 0 ? "/images/hu-tieu-tuoi.jpg" : idx === 1 ? "/images/hu-tieu-kho.jpg" : "/images/hu-tieu-mix.png"} 
                  alt={cat.name} 
                  className={styles.categoryImage} 
                />
                <div className={styles.categoryOverlay}>
                  <h3 className={styles.categoryName}>{cat.name}</h3>
                </div>
              </Link>
            ))}
            {categories.length === 0 && (
              <p style={{ gridColumn: '1/-1', textAlign: 'center' }}>Đang tải danh mục...</p>
            )}
          </div>
        </div>
      </section>

      {/* 5. Featured Products Section */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Sản Phẩm <span className="text-primary">Bán Chạy</span></h2>
            <p className={styles.sectionDesc}>Những tinh túy được khách hàng yêu thích nhất từ gian bếp Xóm Tíu.</p>
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
                    <button className="btn btn-primary">
                      {product.variants && product.variants.length > 0 ? 'Chọn tùy chọn' : 'Thêm vào giỏ'}
                    </button>
                  </div>
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productPrice}>
                    {product.variants && product.variants.length > 0 ? (
                      <>Từ {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Math.min(...product.variants.map((v: any) => v.price)))}</>
                    ) : (
                      new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)
                    )}
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

      {/* 6. Values Section */}
      <section className={styles.values}>
        <div className={`container ${styles.valuesContainer}`}>
          <div className={styles.valueItem}>
            <div className={styles.valueIcon}>
              <Leaf size={48} strokeWidth={1.5} />
            </div>
            <h3 className={styles.valueTitle}>Nguyên liệu tươi sạch</h3>
            <p className={styles.valueDesc}>Tuyển chọn kỹ lưỡng mỗi ngày từ nông trại địa phương, cam kết không chất bảo quản.</p>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueIcon}>
              <Flame size={48} strokeWidth={1.5} />
            </div>
            <h3 className={styles.valueTitle}>Công thức gia truyền</h3>
            <p className={styles.valueDesc}>Giữ trọn hương vị nguyên bản qua nhiều thế hệ với nước dùng thanh ngọt tự nhiên.</p>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueIcon}>
              <Timer size={48} strokeWidth={1.5} />
            </div>
            <h3 className={styles.valueTitle}>Giao hàng siêu tốc</h3>
            <p className={styles.valueDesc}>Nóng hổi đến tay bạn chỉ trong vòng 30 phút, đảm bảo chất lượng tuyệt đối.</p>
          </div>
        </div>
      </section>





      {/* 11. Info / Contact Section */}
      <section className={styles.infoSection}>
        <div className="container">
          <div className={styles.infoGrid}>

            <div className={styles.infoBox}>
              <h3><PhoneCall size={24} className="text-primary" /> Liên hệ với chúng tôi</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '1.5rem' }}>
                Bạn có câu hỏi hoặc cần hỗ trợ đặt tiệc số lượng lớn? Đội ngũ Xóm Tíu luôn sẵn sàng phục vụ bạn 24/7.
              </p>
              <div style={{ background: 'var(--color-bg-base)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                  <strong style={{ minWidth: '100px' }}>Hotline:</strong> <span className="text-primary" style={{ fontWeight: '700', fontSize: '1.25rem' }}>0854.576.340</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <strong style={{ minWidth: '100px' }}>Email:</strong> <span>hello@xomtiu.vn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <h2 className={styles.ctaTitle}>Bạn đã sẵn sàng thưởng thức?</h2>
          <p className={styles.ctaDesc}>Đặt hàng ngay hôm nay để nhận ưu đãi giảm 15% cho đơn hàng đầu tiên của bạn tại Xóm Tíu.</p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/menu" className="btn btn-outline" style={{ backgroundColor: 'white', color: 'var(--color-primary-red)', border: 'none', padding: '1rem 2.5rem', fontWeight: '700' }}>
              Xem thực đơn
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
