export interface FeedPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  author: string;
  date: string;
  category: string;
}

export const mockFeedData: FeedPost[] = [
  {
    id: "1",
    title: "Bí Quyết Nấu Nước Lèo Ngọt Thanh Từ Xương Ống",
    excerpt: "Khám phá bí mật đằng sau hương vị nước lèo đặc trưng của Xóm Tíu, được hầm liên tục trong 12 giờ đồng hồ.",
    content: "Nước lèo là linh hồn của một tô hủ tiếu ngon. Tại Xóm Tíu, chúng tôi không sử dụng bột ngọt hay các chất điều vị nhân tạo. Độ ngọt thanh của nước dùng hoàn toàn đến từ xương ống heo tươi, tôm khô loại 1 và mực nướng. Xương được chần kỹ bằng nước sôi và muối để loại bỏ tạp chất trước khi đem ninh nhỏ lửa trong 12 tiếng. Việc vớt bọt liên tục cũng là yếu tố quan trọng giúp nồi nước lèo luôn trong vắt và thơm lừng.",
    imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=800&auto=format&fit=crop",
    author: "Bếp Trưởng Xóm Tíu",
    date: "25 Tháng 5, 2026",
    category: "Bí Quyết Ẩm Thực"
  },
  {
    id: "2",
    title: "Sợi Hủ Tiếu Dai Ngon - Nét Đẹp Nghề Làm Bột",
    excerpt: "Hành trình đi tìm sợi hủ tiếu hoàn hảo từ những làng nghề làm bột truyền thống lâu đời.",
    content: "Để có được sợi hủ tiếu dai ngon, không bị nát khi chan nước lèo nóng, Xóm Tíu đã cất công tìm kiếm nguồn cung cấp từ các làng nghề làm bột truyền thống ở Sa Đéc. Gạo được chọn phải là loại gạo nở, ngâm đủ thời gian và xay bằng cối đá để giữ nguyên hương vị. Quy trình tráng bánh và phơi sương cũng đòi hỏi sự tỉ mỉ của người thợ lành nghề. Chính sự kết hợp giữa truyền thống và tâm huyết đã tạo nên sợi hủ tiếu mang thương hiệu Xóm Tíu.",
    imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop",
    author: "Team Xóm Tíu",
    date: "20 Tháng 5, 2026",
    category: "Nguyên Liệu"
  },
  {
    id: "3",
    title: "Cách Ăn Hủ Tiếu Khô Chuẩn Vị Người Sài Gòn",
    excerpt: "Hủ tiếu khô không chỉ là một món ăn, mà còn là một nghệ thuật thưởng thức ẩm thực của người dân đất Sài thành.",
    content: "Nếu như hủ tiếu nước mang đến cảm giác thanh tao, thì hủ tiếu khô lại đánh thức vị giác bằng sự đậm đà của nước sốt. Một tô hủ tiếu khô đúng chuẩn phải có sợi hủ tiếu tơi, không bị dính cục. Nước sốt trộn phải cân bằng giữa vị mặn, ngọt, chua nhẹ và cay nồng. Thêm chút tóp mỡ giòn rụm, hành phi thơm lừng và rau cần tây tươi mát. Đặc biệt, chén nước lèo nóng hổi đi kèm chính là điểm nhấn để bữa ăn thêm phần trọn vẹn.",
    imageUrl: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=800&auto=format&fit=crop",
    author: "Góc Nhìn Thực Khách",
    date: "15 Tháng 5, 2026",
    category: "Văn Hóa Ẩm Thực"
  },
  {
    id: "4",
    title: "Câu Chuyện Khởi Nghiệp Xóm Tíu: Giữ Gìn Vị Xưa",
    excerpt: "Từ gánh hủ tiếu nhỏ ven đường đến thương hiệu mang đậm bản sắc truyền thống giữa lòng thành phố nhộn nhịp.",
    content: "Bắt đầu từ một gánh hủ tiếu nhỏ bé trong con hẻm sâu, Xóm Tíu được hình thành bằng tình yêu với hương vị truyền thống. Khó khăn lớn nhất không phải là việc mở rộng quy mô, mà là làm sao để giữ nguyên vẹn cái hồn của tô hủ tiếu gõ ngày nào, đồng thời nâng tầm trải nghiệm cho thực khách. Xóm Tíu đã và đang nỗ lực mỗi ngày để mang đến những bữa ăn không chỉ ngon miệng mà còn chứa đựng tình cảm gia đình ấm áp.",
    imageUrl: "https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=800&auto=format&fit=crop",
    author: "Nhà Sáng Lập",
    date: "10 Tháng 5, 2026",
    category: "Chuyện Xóm Tíu"
  }
];
