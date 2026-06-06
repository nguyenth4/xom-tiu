import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { api } from '../../../services/api';
import styles from './Auth.module.css';

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Lấy email được truyền sang từ trang ForgotPassword
  const email = location.state?.email;

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Nếu người dùng truy cập thẳng vào trang này mà chưa nhập email ở trang Forgot
  if (!email) {
    return (
      <div className={`animate-fade-in ${styles.authPage}`}>
        <div className={styles.authCard}>
          <h1 className={styles.title}>Lỗi Xác Thực</h1>
          <p className={styles.subtitle} style={{ color: '#ef4444' }}>
            Không tìm thấy thông tin email yêu cầu đổi mật khẩu.
          </p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/forgot-password" className={`btn btn-primary ${styles.submitBtn}`}>
              Quay lại trang yêu cầu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, otp, newPassword: password });
      setMessage('Đặt lại mật khẩu thành công! Đang chuyển về Đăng nhập...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      alert(err.message || 'Mã OTP không hợp lệ hoặc đã hết hạn.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`animate-fade-in ${styles.authPage}`}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>Nhập Mã OTP</h1>
        <p className={styles.subtitle}>
          Mã xác thực gồm 6 chữ số đã được gửi tới <strong>{email}</strong>
        </p>

        {message && (
          <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#eefcf5', color: '#10b981', borderRadius: '8px', textAlign: 'center', fontWeight: '500', fontSize: '14px' }}>
            {message}
          </div>
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="otp">Mã OTP (6 chữ số)</label>
            <input 
              type="text" 
              id="otp" 
              className="input-field" 
              placeholder="Ví dụ: 123456" 
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              pattern="\d{6}"
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Mật khẩu mới</label>
            <input 
              type="password" 
              id="password" 
              className="input-field" 
              placeholder="Tối thiểu 6 ký tự" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="input-field" 
              placeholder="Nhập lại mật khẩu" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              required 
            />
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading || !!message}>
            {loading ? 'Đang xử lý...' : 'Xác Nhận Đổi Mật Khẩu'}
          </button>
        </form>
        
        <p className={styles.toggleText}>
          <Link to="/forgot-password" className={styles.toggleLink}>
            Yêu cầu gửi lại mã
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
