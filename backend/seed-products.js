const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // CẢNH BÁO: Đã đóng lệnh xóa toàn bộ sản phẩm để tránh làm mất dữ liệu người dùng đã nhập
  // await prisma.product.deleteMany();

  const categories = await prisma.category.findMany();
  
  const htn = categories.find(c => c.name === 'Hủ Tiếu Tươi');
  const htk = categories.find(c => c.name === 'Hủ Tiếu Khô');
  const combo = categories.find(c => c.name === 'Combo');

  const products = [
    {
      name: 'Hủ tiếu tươi',
      price: 40000,
      stock: 100,
      status: 'Còn hàng',
      image: '/images/hu-tieu-tuoi.jpg',
      categoryId: htn ? htn.id : categories[0].id,
      shortDescription: `Sợi hủ tiếu mềm dai tự nhiên, thơm mùi gạo mới. Mua từ 5kg trở lên – miễn phí ship toàn khu vực Miền Tây!`,
      description: `THÔNG TIN SẢN PHẨM
Sản phẩm: HỦ TIẾU TƯƠI XÓM TÍU
Thương hiệu: XÓM TÍU
Nguồn gốc: Làng nghề Hủ Tiếu Sáu Hoài – Cái Răng, Cần Thơ
Thành phần: Gạo và rau củ tự nhiên (khoai tây, củ dền, trái gấc, thanh long...)
Hạn sử dụng: 3 tháng kể từ ngày sản xuất
Hướng dẫn sử dụng: Rửa qua nước lạnh, để ráo và trụng nhanh với nước sôi. Dùng để chế biến các món chiên, xào, nấu hoặc món nước theo sở thích. 
Hướng dẫn bảo quản: 
7 ngày ở nhiệt độ thường
2 tháng trong ngăn mát tủ lạnh
Khối lượng: 1kg

5 ĐIỂM NỔI BẬT CỦA HỦ TIẾU TƯƠI XÓM TÍU
1: Sợi hủ tiếu mềm dai tự nhiên, thơm mùi gạo mới
2: Màu sắc từ rau củ tự nhiên, đẹp mắt và an toàn
3: Không phẩm màu – không chất bảo quản
4: Phù hợp cho nhiều món: nước, xào, trộn
5: Giữ trọn hương vị truyền thống miền Tây

KHÔNG CHẤT BẢO QUẢN – KHÔNG PHẨM MÀU – KHÔNG PHỤ GIA

Ship hàng toàn quốc
Mua từ 5kg trở lên – miễn phí ship toàn khu vực Miền Tây
Nếu bạn gặp bất kỳ vấn đề nào về sản phẩm, đừng vội đánh giá mà hãy liên hệ với Xóm Tíu để được hỗ trợ nhanh nhất nhé!
Trong trường hợp giao nhầm hoặc lỗi sản phẩm, Xóm Tíu sẽ hỗ trợ đổi trả và xử lý tận tình cho bạn.`,
      variants: [
        { name: '1kg', price: 40000 },
        { name: 'Combo 2kg', price: 75000 },
        { name: 'Combo 3kg', price: 110000 }
      ]
    },
    {
      name: 'Hủ tiếu khô',
      price: 45000,
      stock: 100,
      status: 'Còn hàng',
      image: '/images/hu-tieu-kho.jpg',
      categoryId: htk ? htk.id : categories[0].id,
      shortDescription: `Dễ bảo quản, tiện lợi cho sử dụng hằng ngày. Mua từ 3kg trở lên – miễn phí ship toàn khu vực Miền Tây!`,
      description: `THÔNG TIN SẢN PHẨM
Sản phẩm: HỦ TIẾU KHÔ XÓM TÍU
Thương hiệu: XÓM TÍU
Nguồn gốc: Làng nghề Hủ Tiếu Sáu Hoài – Cái Răng, Cần Thơ
Thành phần: Gạo và rau củ tự nhiên (khoai tây, củ dền, trái gấc, thanh long...)
Hạn sử dụng: 
3 tháng ở nhiệt độ thường
6 tháng trong tủ mát
Hướng dẫn sử dụng: Hủ tiếu khô ngâm nước lạnh khoảng 10 phút rồi trụng nước sôi. Dùng chế biến các món chiên, xào, nấu theo sở thích. 
Hướng dẫn bảo quản: Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp
Khối lượng: 500g

5 ĐIỂM NỔI BẬT CỦA HỦ TIẾU KHÔ XÓM TÍU
1: Dễ bảo quản, tiện lợi cho sử dụng hằng ngày
2: Sợi hủ tiếu dai ngon, giữ vị gạo tự nhiên
3: Màu sắc từ rau củ tự nhiên, không phẩm màu
4: Phù hợp làm quà tặng đặc sản miền Tây
5: Chế biến nhanh chóng cho nhiều món ăn khác nhau

KHÔNG CHẤT BẢO QUẢN – KHÔNG PHẨM MÀU – KHÔNG PHỤ GIA

Ship hàng toàn quốc
Mua từ 3kg trở lên – miễn phí ship toàn khu vực Miền Tây
Nếu bạn gặp bất kỳ vấn đề nào về sản phẩm, đừng vội đánh giá mà hãy liên hệ với Xóm Tíu để được hỗ trợ nhanh nhất nhé!
Trong trường hợp giao nhầm hoặc lỗi sản phẩm, Xóm Tíu sẽ hỗ trợ đổi trả và xử lý tận tình cho bạn.`,
      variants: [
        { name: '0.5kg', price: 45000 },
        { name: 'Combo 1kg', price: 85000 },
        { name: 'Combo 2kg', price: 170000 }
      ]
    },
    {
      name: 'Combo yêu thương',
      price: 90000,
      stock: 50,
      status: 'Còn hàng',
      image: '/images/hu-tieu-mix.png',
      categoryId: combo ? combo.id : categories[0].id,
      shortDescription: `Kết hợp cả hủ tiếu tươi và hủ tiếu khô. Combo gồm 1kg Hủ Tiếu Tươi và 0.5kg Hủ Tiếu Khô.`,
      description: `Combo gồm:
1kg Hủ Tiếu Tươi Xóm Tíu
0.5kg Hủ Tiếu Khô Xóm Tíu

THÔNG TIN COMBO
Sản phẩm: COMBO YÊU THƯƠNG XÓM TÍU
Thương hiệu: XÓM TÍU
Thành phần combo: 1kg Hủ Tiếu Tươi Xóm Tíu, 0.5kg Hủ Tiếu Khô Xóm Tíu
Nguồn gốc: Làng nghề Hủ Tiếu Sáu Hoài – Cái Răng, Cần Thơ
Giá combo: 90.000 VNĐ
Hạn sử dụng:
Hủ tiếu tươi: 3 tháng
Hủ tiếu khô: 6 tháng
Hướng dẫn bảo quản:
Bảo quản nơi khô ráo, thoáng mát
Sau khi mở bao bì nên bảo quản kín hoặc để ngăn mát tủ lạnh

5 ĐIỂM ĐẶC BIỆT CỦA COMBO YÊU THƯƠNG XÓM TÍU
1: Mix sẵn tiện lợi, dễ lựa chọn
2: Kết hợp cả hủ tiếu tươi và hủ tiếu khô
3: Màu sắc tự nhiên từ rau củ, an toàn cho sức khỏe
4: Không phẩm màu – không chất bảo quản
5: Đậm hương vị truyền thống miền Tây

KHÔNG CHẤT BẢO QUẢN – KHÔNG PHẨM MÀU – KHÔNG PHỤ GIA

Ship hàng toàn quốc, hỗ trợ phí ship ưu đãi
Nếu có bất kỳ vấn đề nào về sản phẩm, hãy liên hệ ngay với Xóm Tíu để được hỗ trợ nhanh chóng và tận tình nhé!
Xóm Tíu luôn sẵn sàng hỗ trợ đổi trả nếu có lỗi từ sản phẩm hoặc giao nhầm hàng.`,
      variants: [
        { name: '1 combo', price: 90000 }
      ]
    }
  ];

  for (const prod of products) {
    await prisma.product.create({
      data: prod
    });
  }

  console.log('Đã tạo lại các sản phẩm với dữ liệu mới thành công!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
