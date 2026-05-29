import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { mockFeedData } from '../../../data/mockFeedData';
import styles from './Feed.module.css';

const Feed = () => {
  return (
    <div className={`animate-fade-in ${styles.feedPage}`}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Chuyện Xóm Tíu</h1>
          <p className={styles.heroSubtitle}>Những câu chuyện ẩm thực, bí quyết và văn hóa đằng sau tô hủ tiếu truyền thống.</p>
        </div>
      </section>

      <section className={`container ${styles.feedSection}`}>
        <div className={styles.grid}>
          {mockFeedData.map((post) => (
            <article key={post.id} className={`${styles.card} glass-panel`}>
              <div className={styles.imageWrapper}>
                <img src={post.imageUrl} alt={post.title} className={styles.image} />
                <span className={styles.category}>{post.category}</span>
              </div>
              <div className={styles.content}>
                <h2 className={styles.title}>
                  <Link to={`/feed/${post.id}`}>{post.title}</Link>
                </h2>
                <div className={styles.meta}>
                  <span className="flex items-center gap-2"><User size={14} /> {post.author}</span>
                  <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                </div>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <Link to={`/feed/${post.id}`} className={styles.readMore}>
                  Đọc tiếp <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Feed;
