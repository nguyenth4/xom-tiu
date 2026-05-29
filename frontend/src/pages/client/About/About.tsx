import styles from './About.module.css';

const About = () => {
  return (
    <div className={`animate-fade-in ${styles.aboutPage}`}>
      <section className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1920&auto=format&fit=crop"
          alt="Xóm Tíu Background"
          className={styles.heroBg}
        />
        <div className={styles.heroOverlay}></div>
        <div className="container">
          <h1 className={styles.heroTitle}>Câu Chuyện Xóm Tíu</h1>
          <p className={styles.heroSubtitle}>Từ gánh hủ tiếu nhỏ ven đường đến thương hiệu mang đậm bản sắc truyền thống.</p>
        </div>
      </section>

      <section className="container">
        <div className={styles.storySection}>
          <div className={styles.storyContent}>
            <h2>Hương Vị Được Lưu Truyền</h2>
            <p>
              Ra đời từ những năm 1990 tại một con hẻm nhỏ giữa lòng Sài Gòn, <strong>Xóm Tíu</strong> bắt nguồn từ một gánh hủ tiếu gõ đơn sơ. Qua hơn ba thập kỷ, chúng tôi vẫn giữ nguyên công thức nấu nước lèo gia truyền: hầm từ 100% xương ống trong suốt 12 tiếng đồng hồ cùng tôm khô, mực nướng và các loại gia vị tự nhiên.
            </p>
            <p>
              Với triết lý "Nấu cho khách như nấu cho gia đình", mỗi tô hủ tiếu tại Xóm Tíu không chỉ là một bữa ăn, mà còn là sự kết nối của kỷ niệm và tình yêu với ẩm thực truyền thống Việt Nam.
            </p>
            <p>
              Sự ra đời của website Xóm Tíu đánh dấu một bước chuyển mình hiện đại hơn, giúp món ăn đậm chất "hẻm" này có thể đến tay mọi thực khách một cách tiện lợi, nhanh chóng nhưng vẫn giữ trọn vẹn sức nóng và hương vị nguyên bản.
            </p>
            <div className={styles.signature}>Xóm Tíu</div>
          </div>
          <div className={styles.storyImageWrapper}>
            <img
              src="https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=800&auto=format&fit=crop"
              alt="Hủ Tiếu Nam Vang Sài Gòn"
              className={styles.storyImage}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
