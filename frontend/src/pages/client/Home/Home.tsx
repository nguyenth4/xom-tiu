import { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Flame, Timer, Play, Star, MapPin, PhoneCall, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';
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
            <img src="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&auto=format&fit=crop" alt="Câu chuyện Xóm Tíu" className={styles.storyImage} />
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
          <div className={styles.processGrid}>
            <div className={styles.processItem}>
              <div className={styles.processIconWrapper}><Leaf /></div>
              <h3 className={styles.processTitle}>1. Chọn lọc nguyên liệu</h3>
              <p className={styles.processDesc}>Rau củ tươi sạch từ nông trại địa phương, không hóa chất.</p>
            </div>
            <div className={styles.processItem}>
              <div className={styles.processIconWrapper}><ShieldCheck /></div>
              <h3 className={styles.processTitle}>2. Sơ chế an toàn</h3>
              <p className={styles.processDesc}>Làm sạch bằng hệ thống nước ozon, đảm bảo vệ sinh 100%.</p>
            </div>
            <div className={styles.processItem}>
              <div className={styles.processIconWrapper}><Flame /></div>
              <h3 className={styles.processTitle}>3. Chế biến gia truyền</h3>
              <p className={styles.processDesc}>Sợi hủ tiếu làm thủ công, phơi nắng tự nhiên tại làng nghề.</p>
            </div>
            <div className={styles.processItem}>
              <div className={styles.processIconWrapper}><Truck /></div>
              <h3 className={styles.processTitle}>4. Đóng gói & Giao hàng</h3>
              <p className={styles.processDesc}>Giao hàng hỏa tốc trong 30 phút, đảm bảo độ nóng hổi.</p>
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
                  src={idx === 0 ? "https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=600&auto=format&fit=crop" : idx === 1 ? "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=600&auto=format&fit=crop" : "https://images.unsplash.com/photo-1594221708778-94f1d1746978?q=80&w=600&auto=format&fit=crop"} 
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

      {/* 7. Gallery Section */}
      <section className={styles.gallerySection}>
        <div className="container-fluid" style={{ padding: '0 2%' }}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Hình Ảnh <span className="text-primary">Thực Tế</span></h2>
            <p className={styles.sectionDesc}>Mỗi món ăn là một tác phẩm nghệ thuật đến từ tâm huyết của người đầu bếp.</p>
          </div>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem}><img src="https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=400&auto=format&fit=crop" alt="Gallery 1" /></div>
            <div className={styles.galleryItem}><img src="https://images.unsplash.com/photo-1562565652-a6e87d624992?q=80&w=400&auto=format&fit=crop" alt="Gallery 2" /></div>
            <div className={styles.galleryItem}><img src="https://images.unsplash.com/photo-1617093727343-374698b1b08d?q=80&w=400&auto=format&fit=crop" alt="Gallery 3" /></div>
            <div className={styles.galleryItem}><img src="https://images.unsplash.com/photo-1548943487-a2e4e43b4853?q=80&w=400&auto=format&fit=crop" alt="Gallery 4" /></div>
          </div>
        </div>
      </section>

      {/* 8. Blog Section */}
      <section className={styles.blogSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Chuyện <span className="text-primary">Xóm Tíu</span></h2>
            <p className={styles.sectionDesc}>Những câu chuyện văn hóa, ẩm thực và đời sống miền Tây.</p>
          </div>
          <div className={styles.blogGrid}>
            <Link to="/feed" className={styles.blogCard}>
              <img src="https://images.unsplash.com/photo-1508213824874-954f9a071d79?q=80&w=600&auto=format&fit=crop" alt="Blog 1" className={styles.blogImage} />
              <div className={styles.blogContent}>
                <span className={styles.blogDate}>Tập 1 • 20 Tháng 5, 2026</span>
                <h3 className={styles.blogTitle}>Bí quyết làm hủ tiếu rau củ ngũ sắc</h3>
                <p className={styles.blogExcerpt}>Cùng khám phá cách những người thợ lành nghề tạo ra sợi hủ tiếu tự nhiên...</p>
              </div>
            </Link>
            <Link to="/feed" className={styles.blogCard}>
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=600&auto=format&fit=crop" alt="Blog 2" className={styles.blogImage} />
              <div className={styles.blogContent}>
                <span className={styles.blogDate}>Tập 2 • 15 Tháng 5, 2026</span>
                <h3 className={styles.blogTitle}>Nước dùng thanh ngọt - Hồn cốt món ăn</h3>
                <p className={styles.blogExcerpt}>Nồi nước dùng 12 tiếng hầm từ xương ống và rau củ tươi mang lại vị ngọt tự nhiên...</p>
              </div>
            </Link>
            <Link to="/feed" className={styles.blogCard}>
              <img src="https://images.unsplash.com/photo-1551218808-94e220e084d2?q=80&w=600&auto=format&fit=crop" alt="Blog 3" className={styles.blogImage} />
              <div className={styles.blogContent}>
                <span className={styles.blogDate}>Tập 3 • 10 Tháng 5, 2026</span>
                <h3 className={styles.blogTitle}>Làng nghề hủ tiếu Sáu Hoài rộn rã</h3>
                <p className={styles.blogExcerpt}>Ghé thăm làng nghề trăm tuổi vào một sớm mai để thấy tình yêu với hủ tiếu truyền thống...</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Video Section */}
      <section className={styles.videoSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Khám Phá <span className="text-primary">Không Gian Xóm Tíu</span></h2>
            <p className={styles.sectionDesc}>Video giới thiệu chân thực nhất về những gì chúng tôi đang làm.</p>
          </div>
          <div className={styles.videoContainer}>
            <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop" alt="Video cover" className={styles.videoPlaceholder} />
            <div className={styles.playButton}>
              <Play size={36} fill="white" />
            </div>
          </div>
        </div>
      </section>

      {/* 10. Testimonials */}
      <section className={styles.testimonialSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Khách Hàng <span className="text-primary">Nói Gì?</span></h2>
            <p className={styles.sectionDesc}>Hơn 10,000+ thực khách đã trải nghiệm và hài lòng.</p>
          </div>
          <div className={styles.testimonialGrid}>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
              </div>
              <p className={styles.testimonialText}>"Hủ tiếu ở đây thực sự xuất sắc. Nước dùng ngọt thanh không bị gắt mùi bột ngọt, sợi hủ tiếu rau củ mềm dai ăn rất lạ miệng. Nhất định sẽ quay lại!"</p>
              <h4 className={styles.testimonialAuthor}>- Chị Mai Lan</h4>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
              </div>
              <p className={styles.testimonialText}>"Mình order giao tận nhà, bao bì rất sạch sẽ và chỉn chu. Hủ tiếu vẫn còn nóng hổi. Mình ấn tượng nhất là hương vị đậm chất miền Tây quê mình."</p>
              <h4 className={styles.testimonialAuthor}>- Anh Tuấn Khang</h4>
            </div>
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
                <Star size={18} fill="currentColor" className="inline-block" />
              </div>
              <p className={styles.testimonialText}>"Combo ở đây giá rất hợp lý cho nhóm bạn hoặc gia đình. Phục vụ nhiệt tình, không gian quán rất ấm cúng. Điểm 10 cho chất lượng và dịch vụ."</p>
              <h4 className={styles.testimonialAuthor}>- Gia đình chị Thu</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Info / Contact Section */}
      <section className={styles.infoSection}>
        <div className="container">
          <div className={styles.infoGrid}>
            <div className={styles.infoBox}>
              <h3><MapPin size={24} className="text-primary" /> Khu vực phân phối</h3>
              <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.8', marginBottom: '1rem' }}>
                Chúng tôi hiện đang phục vụ tại các khu vực nội thành TP. Cần Thơ và TP. Hồ Chí Minh với cam kết giao hàng trong 30-45 phút.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--color-primary-red)"/> Quận Ninh Kiều, Cần Thơ</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--color-primary-red)"/> Quận Cái Răng, Cần Thơ</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle2 size={18} color="var(--color-primary-red)"/> Quận 1, 3, 5, 10, TP.HCM</li>
              </ul>
            </div>
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
