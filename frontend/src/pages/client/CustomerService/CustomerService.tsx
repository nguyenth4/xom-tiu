import styles from './CustomerService.module.css';

const CustomerService = () => {
  return (
    <div className={`animate-fade-in ${styles.customerServicePage}`}>
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Chăm Sóc Khách Hàng</h1>
        </div>
      </section>

      <section className="container">
        <div className={styles.contentWrapper}>
          
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Chính Sách Vận Chuyển</h2>
            <div className={styles.sectionContent}>
              <p>Xóm Tíu hỗ trợ giao hàng trên toàn quốc thông qua các đơn vị vận chuyển phù hợp.</p>
              <p><strong>Thời gian giao hàng</strong></p>
              <ul>
                <li>Nội thành: 1–2 ngày làm việc</li>
                <li>Ngoại thành và các tỉnh: 3–5 ngày làm việc tùy khu vực</li>
              </ul>
              <p>Thời gian giao hàng có thể thay đổi trong dịp lễ hoặc điều kiện thời tiết đặc biệt.</p>
              <p><strong>Phí vận chuyển</strong></p>
              <p>Phí vận chuyển được tính theo khu vực giao hàng và khối lượng đơn hàng. Một số chương trình ưu đãi hoặc combo có thể được hỗ trợ miễn phí vận chuyển.</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Chính Sách Đổi Trả</h2>
            <div className={styles.sectionContent}>
              <p><strong>Trường hợp được hỗ trợ đổi/trả</strong></p>
              <p>Khách hàng có thể yêu cầu đổi hoặc trả sản phẩm trong các trường hợp:</p>
              <ul>
                <li>Sản phẩm bị hư hỏng hoặc ảnh hưởng chất lượng trong quá trình vận chuyển</li>
                <li>Giao sai sản phẩm hoặc sai số lượng</li>
                <li>Sản phẩm có dấu hiệu lỗi từ khâu đóng gói hoặc sản xuất</li>
              </ul>
              <p><strong>Điều kiện đổi trả</strong></p>
              <ul>
                <li>Sản phẩm còn nguyên tình trạng ban đầu</li>
                <li>Có hình ảnh hoặc video xác nhận khi mở hàng nếu phát sinh lỗi</li>
                <li>Thời gian phản hồi trong vòng 24 giờ kể từ khi nhận hàng</li>
              </ul>
              <p><strong>Quy trình xử lý</strong></p>
              <p>Khách hàng liên hệ Hotline hoặc Fanpage Xóm Tíu để được xác nhận và hướng dẫn xử lý. Xóm Tíu cam kết hỗ trợ nhanh chóng và minh bạch.</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Phương Thức Thanh Toán</h2>
            <div className={styles.sectionContent}>
              <p>Xóm Tíu hỗ trợ các hình thức thanh toán:</p>
              <ul>
                <li>Thanh toán khi nhận hàng (COD)</li>
                <li>Chuyển khoản ngân hàng</li>
                <li>Ví điện tử (nếu áp dụng)</li>
              </ul>
              <p>Thông tin thanh toán sẽ được xác nhận rõ ràng trước khi giao hàng.</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Hướng Dẫn Mua Hàng</h2>
            <div className={styles.sectionContent}>
              <ul>
                <li><strong>Bước 1:</strong> Chọn sản phẩm yêu thích trên website hoặc fanpage.</li>
                <li><strong>Bước 2:</strong> Thêm vào giỏ hàng và điền thông tin nhận hàng.</li>
                <li><strong>Bước 3:</strong> Xác nhận đơn hàng và phương thức thanh toán.</li>
                <li><strong>Bước 4:</strong> Xóm Tíu xác nhận và tiến hành giao hàng.</li>
                <li><strong>Bước 5:</strong> Nhận hàng và thưởng thức hương vị quê nhà.</li>
              </ul>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Chính Sách Kiểm Hàng</h2>
            <div className={styles.sectionContent}>
              <p><strong>Quy định kiểm hàng</strong></p>
              <ul>
                <li>Khách hàng được kiểm tra tình trạng bên ngoài của đơn hàng khi nhận từ đơn vị vận chuyển.</li>
                <li>Trong trường hợp phát hiện đơn hàng có dấu hiệu hư hỏng, sai sản phẩm hoặc thiếu số lượng, vui lòng phản hồi ngay với Xóm Tíu để được hỗ trợ.</li>
                <li>Khách hàng nên quay video mở hàng để đối chiếu khi cần thiết.</li>
              </ul>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Chính Sách Bảo Mật</h2>
            <div className={styles.sectionContent}>
              <p>Xóm Tíu cam kết bảo mật thông tin cá nhân của khách hàng.</p>
              <p><strong>Thông tin được thu thập gồm:</strong></p>
              <ul>
                <li>Họ tên</li>
                <li>Số điện thoại</li>
                <li>Địa chỉ nhận hàng</li>
                <li>Email (nếu có)</li>
              </ul>
              <p><strong>Thông tin chỉ được sử dụng nhằm:</strong></p>
              <ul>
                <li>Xác nhận và giao đơn hàng</li>
                <li>Hỗ trợ chăm sóc khách hàng</li>
                <li>Gửi thông tin ưu đãi nếu khách hàng đồng ý</li>
              </ul>
              <p>Xóm Tíu không chia sẻ hoặc bán thông tin khách hàng cho bên thứ ba vì mục đích thương mại.</p>
            </div>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Điều Khoản & Điều Kiện</h2>
            <div className={styles.sectionContent}>
              <p>Khi sử dụng website hoặc đặt hàng tại Xóm Tíu, khách hàng đồng ý với các điều khoản sau:</p>
              <ul>
                <li>Cung cấp thông tin đặt hàng chính xác</li>
                <li>Tôn trọng quy trình xác nhận và giao nhận hàng</li>
                <li>Không sử dụng nội dung website cho mục đích vi phạm pháp luật hoặc gây ảnh hưởng đến thương hiệu</li>
                <li>Xóm Tíu có quyền cập nhật chính sách và điều khoản nhằm nâng cao trải nghiệm khách hàng và đảm bảo hoạt động kinh doanh phù hợp thực tế.</li>
              </ul>
              <p className="mt-4 italic">Xin cảm ơn bạn đã đồng hành cùng Xóm Tíu – nơi hương vị quê nhà được giữ gìn bằng sự chân thành và tinh thần sống xanh.</p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CustomerService;
