import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../../services/api';
import styles from './Auth.module.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      setMessage('Mã OTP 6 số đã được gửi đến email của bạn.');
      // Chuyển hướng ngay sang trang nhập OTP và truyền theo email
      setTimeout(() => {
        navigate('/reset-password', { state: { email } });
      }, 1500);
    } catch (err: any) {
      alert(err.message || 'Đã có lỗi xảy ra. Vui lòng thử lại sau.');
      setLoading(false);
    }
  };

  return (
    <div className={`animate-fade-in ${styles.authPage}`}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Quên Mật Khẩu</h1>
        <p className={styles.subtitle}>
          Nhập email của bạn để nhận đường link khôi phục mật khẩu
        </p>

        {message && (
          <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#eefcf5', color: '#10b981', borderRadius: '8px', textAlign: 'center', fontWeight: '500', fontSize: '14px' }}>
            {message}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email đăng nhập</label>
            <input 
              type="email" 
              id="email" 
              className="input-field" 
              placeholder="Nhập email của bạn" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
            {loading ? 'Đang gửi yêu cầu...' : 'Gửi yêu cầu khôi phục'}
          </button>
        </form>

        <p className={styles.toggleText}>
          <Link to="/login" className={styles.toggleLink}>
            Quay lại Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
