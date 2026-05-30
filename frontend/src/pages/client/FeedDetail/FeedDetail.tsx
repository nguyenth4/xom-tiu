import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft } from 'lucide-react';
import { mockFeedData } from '../../../data/mockFeedData';
import styles from './FeedDetail.module.css';

const FeedDetail = () => {
  const { id } = useParams<{ id: string }>();
  const post = mockFeedData.find(p => p.id === id);

  if (!post) {
    return (
      <div className={`container ${styles.notFound}`}>
        <h2>Không tìm thấy bài viết</h2>
        <Link to="/feed" className="btn btn-primary mt-4">
          <ArrowLeft size={20} /> Quay lại Chuyện Xóm Tíu
        </Link>
      </div>
    );
  }

  return (
    <article className={`animate-fade-in ${styles.feedDetailPage}`}>
      <div className={styles.heroImage} style={{ backgroundImage: `url(${post.imageUrl})` }}>
        <div className={styles.heroOverlay}></div>
      </div>
      
      <div className={`container ${styles.contentWrapper}`}>
        <div className={styles.backLinkWrapper}>
          <Link to="/feed" className={styles.backLink}>
            <ArrowLeft size={20} /> Quay lại
          </Link>
        </div>

        <header className={styles.header}>
          <span className={styles.category}>{post.category}</span>
          <h1 className={styles.title}>{post.title}</h1>
          <div className={styles.meta}>
            <span className="flex items-center gap-2"><User size={16} /> {post.author}</span>
            <span className="flex items-center gap-2"><Calendar size={16} /> {post.date}</span>
          </div>
        </header>

        <div className={styles.body}>
          <p className={styles.excerpt}>{post.excerpt}</p>
          <div className={styles.content}>
            <p>{post.content}</p>
            {/* Thêm ảnh minh họa ngẫu nhiên vào nội dung cho sinh động */}
            <img src={post.imageUrl} alt={post.title} className={styles.contentImage} />
            <p>
              Bên cạnh việc chú trọng vào chất lượng nguyên liệu, cách phục vụ cũng là một phần tạo nên nét văn hóa đặc trưng. Khách hàng đến với Xóm Tíu luôn được chào đón bằng nụ cười thân thiện, không gian sạch sẽ và ấm cúng. Từng chi tiết nhỏ đều được chăm chút kỹ lưỡng nhằm mang đến trải nghiệm tuyệt vời nhất.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedDetail;
