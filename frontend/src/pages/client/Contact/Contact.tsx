import { MapPin, Phone, Mail, Send } from 'lucide-react';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={`container animate-fade-in ${styles.contactPage}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>Liên Hệ <span className="text-primary">Xóm Tíu</span></h1>
        <p className={styles.subtitle}>Chúng tôi luôn lắng nghe và sẵn sàng phục vụ bạn.</p>
      </div>

      <div className={styles.content}>
        <div className={styles.infoSection}>
          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <MapPin size={24} />
            </div>
            <div className={styles.infoContent}>
              <h3>Địa chỉ cửa hàng</h3>
              <p>123 Ninh Kiều, TP Cần Thơ</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <Phone size={24} />
            </div>
            <div className={styles.infoContent}>
              <h3>Đường dây nóng</h3>
              <p>1900 1234 (Đặt hàng)<br />0909 123 456 (CSKH)</p>
            </div>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.iconWrapper}>
              <Mail size={24} />
            </div>
            <div className={styles.infoContent}>
              <h3>Email</h3>
              <p>hello@xomtiu.vn<br />support@xomtiu.vn</p>
            </div>
          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Gửi tin nhắn cho chúng tôi</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Họ và tên</label>
              <input type="text" id="name" className={styles.input} placeholder="Nhập họ và tên của bạn" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>Số điện thoại</label>
              <input type="tel" id="phone" className={styles.input} placeholder="Nhập số điện thoại" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Nội dung lời nhắn</label>
              <textarea id="message" className={styles.textarea} placeholder="Bạn muốn nhắn gửi điều gì?" required></textarea>
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
              <Send size={20} /> Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
