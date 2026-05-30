import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import styles from './Feed.module.css';

const episodes = [
  {
    id: 1,
    seriesName: 'SERIES: CHUYỆN NHÀ XÓM TÍU',
    date: '25/10/2025',
    quote: '“Nơi mọi câu chuyện đều xoay quanh...hủ tiếu!”',
    title: 'Tập 1: Cội nguồn sợi tiếu – Hành trình từ làng nghề.',
    thumb: '/images/tap-1.jpg',
    banner: '/images/tap-1.jpg',
    content: (
      <>
        <p>Bắt nguồn từ tình yêu với hương vị miền Tây dân dã, Xóm Tíu ra đời như một nơi lưu giữ trọn vẹn tinh hoa ẩm thực truyền thống.</p>
        <p>Chúng tôi bắt đầu hành trình từ việc rong ruổi khắp các ngõ ngách, tìm kiếm công thức gia truyền làm nên tô hủ tiếu ngon đúng điệu. Từ khâu chọn gạo tẻ ngon nhất để làm ra những sợi hủ tiếu dai mềm tự nhiên, đến bí quyết hầm xương ống nhiều giờ liền cho nước dùng ngọt thanh, đậm đà.</p>
      </>
    ),
    youtubeUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 2,
    seriesName: 'SERIES: CHUYỆN NHÀ XÓM TÍU',
    date: '27/10/2025',
    quote: '“Nơi mọi câu chuyện đều xoay quanh...hủ tiếu!”',
    title: 'Tập 2: Cảm nhận đầu tiên qua lời kể.',
    thumb: '/images/tap-2.jpg',
    banner: '/images/tap-2.jpg',
    content: (
      <>
        <p>Hành trình làm ra sợi hủ tiếu rau củ mang đầy tâm huyết của người dân Xóm Tíu.</p>
        <p>Khi cuộc sống ngày càng hối hả, chúng tôi quyết định mang thêm sắc màu tự nhiên vào mâm cơm gia đình. Những bó rau cải bó xôi, củ dền tươi ngon được ép lấy nước, nhào nặn cùng bột gạo, tạo nên những sợi hủ tiếu không chỉ đẹp mắt mà còn bổ dưỡng, an toàn cho sức khỏe.</p>
      </>
    ),
    youtubeUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw'
  },
  {
    id: 3,
    seriesName: 'SERIES: CHUYỆN NHÀ XÓM TÍU',
    date: '29/10/2025',
    quote: '“Nơi mọi câu chuyện đều xoay quanh...hủ tiếu!”',
    title: 'Tập 3: Vào bếp cùng Tíu - Nấu vị quê, thương vị nhà.',
    thumb: '/images/tap-3.jpg',
    banner: '/images/tap-3.jpg',
    content: (
      <>
        <p>Ăn sạch, sống xanh cùng triết lý ẩm thực tại Xóm Tíu.</p>
        <p>Gửi gắm qua từng sản phẩm không chỉ là hương vị thơm ngon mà còn là thông điệp về một lối sống lành mạnh. Chúng tôi cam kết không sử dụng hàn thực hay chất bảo quản độc hại, giữ vững niềm tin và tình yêu của khách hàng dành cho ẩm thực truyền thống Việt Nam.</p>
      </>
    ),
    youtubeUrl: 'https://www.youtube.com/embed/ScMzIvxBSi4'
  }
];

const Feed = () => {
  const [activeTab, setActiveTab] = useState<number | null>(null);

  return (
    <div className={`animate-fade-in ${styles.feedPage}`}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Chuyện Xóm Tíu</h1>
          <p className={styles.heroSubtitle}>Những câu chuyện ẩm thực, bí quyết và văn hóa đằng sau tô hủ tiếu truyền thống.</p>
        </div>
      </section>

      <section className={`container ${styles.feedSection}`}>
        {activeTab === null ? (
          // List View
          <div className={`animate-fade-in ${styles.cardGrid}`}>
            {episodes.map(ep => (
              <div key={ep.id} className={`${styles.horizontalCard} glass-panel`} onClick={() => setActiveTab(ep.id)}>
                <div className={styles.cardImageWrapper}>
                  <img src={ep.thumb} alt={ep.title} className={styles.cardImage} />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardSeries}>{ep.seriesName}</div>
                  <div className={styles.cardDate}>{ep.date}</div>
                  <div className={styles.cardDivider}></div>
                  <div className={styles.cardQuote}>{ep.quote}</div>
                  <h3 className={styles.cardTitle}>{ep.title}</h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Detailed Episode View
          <div className="animate-fade-in">
            <button className={styles.backBtn} onClick={() => setActiveTab(null)}>
              <ArrowLeft size={20} /> Quay lại danh sách
            </button>
            


            {/* Content */}
            {(() => {
              const activeEpisode = episodes.find(ep => ep.id === activeTab)!;
              return (
                <div className={styles.episodeContent}>
                  <div className={styles.bannerWrapper}>
                    <img src={activeEpisode.banner} alt={activeEpisode.title} className={styles.bannerImage} />
                    <div className={styles.bannerOverlay}>
                      <h2 className={styles.bannerTitle}>{activeEpisode.title}</h2>
                    </div>
                  </div>
                  
                  <div className={styles.storyText}>
                    {activeEpisode.content}
                  </div>
                  
                  {/* YouTube Video */}
                  <div className={styles.videoWrapper}>
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={activeEpisode.youtubeUrl} 
                      title={activeEpisode.title} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen>
                    </iframe>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>
    </div>
  );
};

export default Feed;
