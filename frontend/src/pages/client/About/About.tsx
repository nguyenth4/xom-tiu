import { CheckCircle2, Leaf, Heart, Eye, Target, Sparkles, Sprout } from 'lucide-react';
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
          <p className={styles.heroSubtitle}>Ăn sạch – Sống xanh – Giữ trọn vị quê hương</p>
        </div>
      </section>

      <section className="container">
        <div className={styles.storySection}>
          <div className={styles.storyContent}>
            <h2>Khởi nguồn từ sự chân thật</h2>
            <p>
              Hiện nay, người tiêu dùng ngày càng quan tâm nhiều hơn đến sức khỏe và chất lượng thực phẩm trong bữa ăn hằng ngày. Tuy nhiên, trên thị trường vẫn tồn tại nhiều sản phẩm không rõ nguồn gốc, sử dụng chất bảo quản và phẩm màu công nghiệp, khiến khách hàng dần mất niềm tin vào thực phẩm truyền thống.
            </p>
            <p>
              <strong>Xóm Tíu</strong> ra đời với mong muốn mang đến những sản phẩm hủ tiếu rau củ sạch, tự nhiên và an toàn cho sức khỏe, được sản xuất từ làng nghề truyền thống Sáu Hoài – Cái Răng – Cần Thơ. Chúng tôi tin rằng một món ăn ngon không chỉ đến từ hương vị mà còn đến từ sự chân thật, sự an toàn và giá trị quê hương trong từng sợi hủ tiếu.
            </p>
            <p>
              Từ những nguyên liệu tự nhiên như bí đỏ, cà rốt, rau dền, cải xanh, hoa đậu biếc… Xóm Tíu tạo nên những sợi hủ tiếu nhiều màu sắc hoàn toàn tự nhiên, không phẩm màu, không chất bảo quản nhưng vẫn giữ được độ dai mềm và hương thơm đặc trưng của gạo mới miền Tây.
            </p>
            
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-primary-red)' }}>Lan tỏa tinh thần:</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle2 size={20} color="var(--color-primary-red)" /> Ăn sạch – sống khỏe
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle2 size={20} color="var(--color-primary-red)" /> Ủng hộ sản phẩm địa phương
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle2 size={20} color="var(--color-primary-red)" /> Giữ gìn văn hóa ẩm thực miền Tây
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-text-main)' }}>
                  <CheckCircle2 size={20} color="var(--color-primary-red)" /> Kết nối giá trị truyền thống với thế hệ trẻ hiện đại
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.storyImageWrapper}>
            <img
              src="/images/banner.png"
              alt="Hủ Tiếu Xóm Tíu"
              className={styles.storyImage}
            />
          </div>
        </div>

        <div className={styles.missionVisionSection}>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <Eye size={32} />
            </div>
            <h3>Tầm Nhìn</h3>
            <p>
              Xóm Tíu hướng đến trở thành thương hiệu hủ tiếu rau củ truyền thống hàng đầu miền Tây, tiên phong trong việc kết hợp ẩm thực quê hương với xu hướng sống xanh và Digital Marketing hiện đại. Chúng tôi mong muốn đưa hương vị miền Tây đến gần hơn với người tiêu dùng trên khắp Việt Nam và từng bước phát triển thành thương hiệu đặc sản mang đậm bản sắc văn hóa Việt.
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.cardIcon}>
              <Target size={32} />
            </div>
            <h3>Sứ Mệnh</h3>
            <p>
              Xóm Tíu mang hủ tiếu truyền thống Sáu Hoài đến gần hơn với thế hệ trẻ bằng tinh thần sáng tạo và tình yêu quê hương. Chúng mình tạo nên những sản phẩm sạch, an toàn và giàu dinh dưỡng, đồng thời lan tỏa lối sống "ăn sạch – sống xanh". Không chỉ là hủ tiếu, Xóm Tíu còn là câu chuyện về bản sắc miền Tây và niềm tự hào làng nghề truyền thống.
            </p>
          </div>
        </div>
      </section>

      <section className="container">
        <div className={styles.brandPositioning}>
          <h2>Định Vị Thương Hiệu</h2>
          <div className={styles.brandList}>
            <div className={styles.brandItem}>Hủ tiếu rau củ tự nhiên</div>
            <div className={styles.brandItem}>Đậm chất miền Tây</div>
            <div className={styles.brandItem}>Gần gũi – chân thành – hiện đại</div>
            <div className={styles.brandItem}>Phù hợp với người tiêu dùng yêu thích thực phẩm sạch và văn hóa truyền thống</div>
          </div>
        </div>
      </section>

      <section className={`container ${styles.coreValuesSection}`}>
        <h2>Giá Trị Cốt Lõi</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueItem}>
            <div className={styles.valueTitle}>
              <Leaf size={24} /> Tự nhiên
            </div>
            <div className={styles.valueDesc}>
              100% rau củ tự nhiên, không phẩm màu, không chất bảo quản.
            </div>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueTitle}>
              <Sparkles size={24} /> Chất lượng
            </div>
            <div className={styles.valueDesc}>
              Giữ trọn độ dai ngon và hương vị truyền thống của hủ tiếu miền Tây.
            </div>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueTitle}>
              <Heart size={24} /> Chân thành
            </div>
            <div className={styles.valueDesc}>
              Mang tinh thần mộc mạc, gần gũi và đậm tình quê hương.
            </div>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueTitle}>
              <Target size={24} /> Sáng tạo
            </div>
            <div className={styles.valueDesc}>
              Kết hợp truyền thống với Digital Marketing để tiếp cận thế hệ trẻ hiện đại.
            </div>
          </div>
          <div className={styles.valueItem}>
            <div className={styles.valueTitle}>
              <Sprout size={24} /> Bền vững
            </div>
            <div className={styles.valueDesc}>
              Lan tỏa lối sống xanh, tiêu dùng sạch và phát triển sản phẩm địa phương Việt Nam.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
