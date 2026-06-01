import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../../services/api';
import styles from './Auth.module.css';

interface AuthProps {
  defaultMode?: 'login' | 'register';
}

const Auth = ({ defaultMode = 'login' }: AuthProps) => {
  const [isLogin, setIsLogin] = useState(defaultMode === 'login');
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Update state if route changes
  useEffect(() => {
    setIsLogin(defaultMode === 'login');
  }, [defaultMode, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        try {
          const data = await api.post('/auth/login', { email, password });
          localStorage.setItem('token', data.accessToken || data.token || 'mock_token');
          localStorage.setItem('user', JSON.stringify(data.user || { name: data.name || email.split('@')[0], email }));
          navigate('/');
        } catch (err) {
          console.error('API login failed:', err);
          alert('Email hoặc mật khẩu không đúng. Vui lòng kiểm tra lại!');
        }
      } else {
        if (password !== confirmPassword) {
          alert('Mật khẩu xác nhận không khớp!');
          return;
        }
        try {
          const data = await api.post('/auth/register', { name, email, password });
          localStorage.setItem('token', data.accessToken || data.token || 'mock_token');
          localStorage.setItem('user', JSON.stringify(data.user || { name, email }));
          navigate('/');
        } catch (err) {
          console.error('API register failed:', err);
          alert('Đăng ký không thành công. Email có thể đã tồn tại hoặc thông tin không hợp lệ.');
        }
      }
    } catch (error) {
      console.error('Auth error', error);
      alert('Có lỗi xảy ra vui lòng thử lại sau.');
    }
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
              placeholder="Nhập email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
