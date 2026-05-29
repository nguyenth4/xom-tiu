import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Auth.module.css';

interface AuthProps {
  defaultMode?: 'login' | 'register';
}

const Auth = ({ defaultMode = 'login' }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(defaultMode === 'login');
  const navigate = useNavigate();
  const location = useLocation();

  // Update state if route changes
  useEffect(() => {
    setIsLogin(defaultMode === 'login');
  }, [defaultMode, location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth success and redirect to home
    navigate('/');
  };

  const toggleMode = () => {
    if (isLogin) {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={`animate-fade-in ${styles.authPage}`}>
      <div className={styles.authCard}>
        <h1 className={styles.title}>{isLogin ? 'Đăng nhập' : 'Tạo tài khoản'}</h1>
        <p className={styles.subtitle}>
          {isLogin 
            ? 'Chào mừng bạn quay lại với Xóm Tíu' 
            : 'Đăng ký để nhận những ưu đãi đặc biệt từ Xóm Tíu'}
        </p>

        <form className={styles.form} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="name">Họ và tên</label>
              <input 
                type="text" 
                id="name" 
                className="input-field" 
                placeholder="Nhập họ và tên của bạn" 
                required 
              />
            </div>
          )}

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="input-field" 
              placeholder="example@email.com" 
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">Mật khẩu</label>
            <input 
              type="password" 
              id="password" 
              className="input-field" 
              placeholder="Nhập mật khẩu" 
              required 
            />
            {isLogin && (
              <a href="#" className={styles.forgotPassword}>Quên mật khẩu?</a>
            )}
          </div>

          {!isLogin && (
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="confirmPassword">Xác nhận mật khẩu</label>
              <input 
                type="password" 
                id="confirmPassword" 
                className="input-field" 
                placeholder="Nhập lại mật khẩu" 
                required 
              />
            </div>
          )}

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`}>
            {isLogin ? 'Đăng nhập' : 'Đăng ký'}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isLogin ? 'Bạn chưa có tài khoản?' : 'Đã có tài khoản?'}
          <button className={styles.toggleLink} onClick={toggleMode}>
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
