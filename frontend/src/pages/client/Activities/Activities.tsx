import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from '../Feed/Feed.module.css'; // Reusing feed styles for consistency

const activities = [
  {
    id: 4,
    tabName: 'Sự kiện & Khuyến mãi',
    title: 'HỘP YÊU THƯƠNG 20/10',
    banner: '/images/hop-yeu-thuong.JPG',
    content: (
      <>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary-red)' }}>Hộp yêu thương 20/10 giá chỉ từ 130.000 VNĐ</h3>
        <p style={{ marginBottom: '0.5rem' }}><strong>Bao gồm:</strong></p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
          <li>Hủ tiếu tươi & khô mix</li>
          <li>Thiệp tặng kèm</li>
          <li>Thiết kế hộp quà tinh tế</li>
        </ul>
        <p style={{ marginBottom: '1rem' }}><strong>Phù hợp:</strong> tặng mẹ, bạn gái, người thân trong gia đình.</p>
        <p>Những ngày lễ tri ân người phụ nữ ngoài những câu chúc thì những món quà mang tính chất ấm no như hủ tiếu cũng là một lựa chọn hợp lý. Hãy để họ sưởi ấm căn bếp của gia đình bạn bằng những món ăn ngon.</p>
      </>
    ),
    youtubeUrl: '',
    isPoster: true
  },
  {
    id: 5,
    tabName: 'Sự kiện & Khuyến mãi',
    title: 'COMBO YÊU THƯƠNG',
    banner: '/images/hu-tieu-mix.png',
    content: (
      <>
        <h3 style={{ marginBottom: '1rem', color: 'var(--color-primary-red)' }}>Combo yêu thương giá chỉ từ 90.000 VNĐ</h3>
        <p style={{ marginBottom: '0.5rem' }}><strong>Bao gồm:</strong></p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
          <li>1kg hủ tiếu tươi</li>
          <li>0.5 kg hủ tiếu khô</li>
          <li>Hộp quà</li>
        </ul>
        <p style={{ marginBottom: '1rem' }}><strong>Phù hợp:</strong> để làm quà biếu bạn bè, gia đình.</p>
        <p style={{ marginBottom: '2rem' }}>Trao tặng yêu thương gia đình không chỉ qua những lời nói mà còn là hành động bởi những hành động yêu thương sẽ khiến cho chúng gắn kết cùng với nhau. Hãy cùng Xóm Tíu trao trọn những tình cảm này thông qua Combo Yêu Thương đến với gia đình và bạn bè.</p>
        
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-divider)' }}>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', color: 'var(--color-primary-red)' }}>🌱 Cam kết từ Xóm Tíu</h4>
          <p style={{ fontStyle: 'italic', color: 'var(--color-text-muted)', marginBottom: '1rem' }}>“Ăn sạch – sống xanh – giữ vị quê nhà”</p>
          <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: '2' }}>
            <li>✔ Nguyên liệu tự nhiên</li>
            <li>✔ Sản xuất thủ công truyền thống</li>
            <li>✔ Hương vị miền Tây chân thật</li>
            <li>✔ An toàn cho sức khỏe</li>
          </ul>
        </div>
      </>
    ),
    youtubeUrl: '',
    isPoster: true
  },
  {
    id: 1,
    tabName: 'Quy Trình Làm Hủ Tiếu',
    title: 'Hành Trình Tạo Nên Sợi Hủ Tiếu Chứ Danh',
    banner: '/images/quy-trinh-san-xuat.JPG',
    content: (
      <>
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--color-primary-red)' }}>1. Chọn nguyên liệu tự nhiên</h3>
        <p>Hủ Tiếu Sáu Hoài sử dụng gạo tuyển chọn kết hợp cùng các loại rau củ tươi như: khoai tây, củ dền, trái gấc, lá cẩm, hoa đậu biếc, thanh long.</p>
        <div style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-divider)', marginTop: '1rem' }}>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '1.1rem', color: 'var(--color-primary-red)' }}>Cam kết từ Xóm Tíu</h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0, lineHeight: '2' }}>
            <li>✔ 100% màu tự nhiên</li>
            <li>✔ Không chất bảo quản</li>
            <li>✔ Không phẩm màu công nghiệp</li>
          </ul>
        </div>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--color-primary-red)' }}>2. Xay và phối trộn bột</h3>
        <p>Gạo được xay mịn, sau đó phối trộn cùng nước ép rau củ để tạo nên những sợi hủ tiếu nhiều màu sắc tự nhiên nhưng vẫn giữ được độ dai mềm đặc trưng.</p>
        
        <div style={{ margin: '3rem 0 1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--color-divider)' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '1px' }}>Các Công Đoạn Chế Biến Nên Sợi Hủ Tiếu</h2>
        </div>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary-red)' }}>3. Tráng bánh thủ công</h3>
        <p>Bột được tráng thành từng lớp mỏng trên xửng hấp theo phương pháp truyền thống tại làng nghề Hủ Tiếu Sáu Hoài – Cần Thơ, giúp hình thành nên những mảng bánh hủ tiếu mỏng.</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--color-primary-red)' }}>4. Phơi</h3>
        <p>Bánh hủ tiếu sau khi được tráng thì đem phơi trong khoảng 1 ngày để bánh hủ tiếu khô lại.</p>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--color-primary-red)' }}>5. Cắt sợi & xử lý thành phẩm</h3>
        <p>Sau khi phơi khô, bánh được cắt thành sợi hủ tiếu với độ dày vừa phải để đảm bảo dai mềm tự nhiên không bở khi nấu và dễ chế biến nhiều món ăn.</p>

        <div style={{ margin: '3rem 0 1rem', paddingBottom: '0.5rem', borderBottom: '2px solid var(--color-divider)' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--color-text-main)', textTransform: 'uppercase', letterSpacing: '1px' }}>Phân Loại Và Đóng Gói</h2>
        </div>

        <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary-red)' }}>6. Phân loại sản phẩm</h3>
        <p>Xóm Tíu hiện có 2 dòng sản phẩm:</p>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>Hủ tiếu tươi:</strong> Mềm dai tự nhiên, thích hợp dùng ngay, phù hợp cho món nước hoặc xào.</li>
          <li><strong>Hủ tiếu khô:</strong> Được sấy và đóng gói cẩn thận, dễ bảo quản, tiện mang đi xa, giữ được hương vị truyền thống.</li>
        </ul>
        
        <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--color-primary-red)' }}>7. Đóng gói & giao hàng</h3>
        <p>Sản phẩm được đóng gói sạch sẽ, hút chân không và kiểm tra trước khi giao đến khách hàng nhằm đảm bảo: an toàn vệ sinh, giữ độ tươi ngon, thuận tiện bảo quản.</p>
      </>
    ),
    youtubeUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4'
  }
];

const Activities = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  const activeContent = activities.find(a => a.id === activeTab);

  return (
    <div className={`animate-fade-in ${styles.feedPage}`}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Hoạt Động</h1>
          <p className={styles.heroSubtitle}>Khám phá quy trình sản xuất, các sự kiện và những hoạt động nổi bật tại Xóm Tíu.</p>
        </div>
      </section>

      <section className={`container ${styles.feedSection}`}>
        {activeTab === null ? (
          // List View
          <div className={`animate-fade-in ${styles.cardGrid}`}>
            {activities.map(activity => (
              <div key={activity.id} className={`${styles.horizontalCard} glass-panel`} onClick={() => setActiveTab(activity.id)}>
                <div 
                  className={styles.cardImageWrapper}
                  style={activity.isPoster ? { minHeight: '300px', width: '220px' } : undefined}
                >
                  <img 
                    src={activity.banner} 
                    alt={activity.title} 
                    className={styles.cardImage} 
                    style={activity.isPoster ? { objectFit: 'contain', objectPosition: 'center', backgroundColor: '#f9f9f9' } : undefined}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardSeries}>{activity.tabName}</div>
                  <div className={styles.cardDivider}></div>
                  <h3 className={styles.cardTitle} style={{ marginBottom: '0.5rem' }}>{activity.title}</h3>
                  <div className={styles.cardQuote} style={{ color: 'var(--color-text-muted)' }}>Click để xem chi tiết...</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Detailed View
          <div className="animate-fade-in">
            <button className={styles.backBtn} onClick={() => setActiveTab(null)}>
              <ArrowLeft size={20} /> Quay lại danh sách
            </button>
            
            {activeContent && (
              <div className={styles.episodeContent}>
                <div 
                  className={styles.bannerWrapper} 
                  style={
                    activeContent.isPoster 
                      ? { height: 'auto', backgroundColor: '#f9f9f9', padding: '2rem 0' } 
                      : { height: 'auto', aspectRatio: '16/9' } // Allow landscape images to show fully without 400px cropping
                  }
                >
                  <img 
                    src={activeContent.banner} 
                    alt={activeContent.title} 
                    className={styles.bannerImage} 
                    style={
                      activeContent.isPoster 
                        ? { objectFit: 'contain', maxHeight: '80vh' } 
                        : { objectFit: 'cover', height: '100%', width: '100%' }
                    }
                  />
                  {!activeContent.isPoster && (
                    <div className={styles.bannerOverlay}>
                      <h2 className={styles.bannerTitle}>{activeContent.title}</h2>
                    </div>
                  )}
                </div>
                
                {activeContent.isPoster && (
                  <h2 className={styles.heroTitle} style={{ marginTop: '2rem', marginBottom: '1.5rem', textAlign: 'left' }}>
                    {activeContent.title}
                  </h2>
                )}
                
                <div className={styles.storyText}>
                  {activeContent.content}
                </div>
                
                {/* YouTube Video (Optional) */}
                {activeContent.youtubeUrl && (
                  <div className={styles.videoWrapper}>
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={activeContent.youtubeUrl} 
                      title={activeContent.title} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Activities;
