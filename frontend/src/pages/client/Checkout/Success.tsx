import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Success = () => {
  return (
    <div className="container" style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh' }}>
      <CheckCircle size={80} color="#4CAF50" style={{ margin: '0 auto 20px' }} />
      <h1 style={{ fontSize: '2rem', marginBottom: '10px' }}>Đặt hàng thành công!</h1>
      <p className="text-muted" style={{ marginBottom: '30px' }}>
        Cảm ơn bạn đã đặt hàng tại Xóm Tíu. Đơn hàng của bạn đang được xử lý.
      </p>
      <Link to="/menu" className="btn btn-primary">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
};

export default Success;
