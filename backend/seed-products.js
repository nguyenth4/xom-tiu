const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing products
  await prisma.product.deleteMany();

  const categories = await prisma.category.findMany();
  
  const htn = categories.find(c => c.name === 'Hủ Tiếu Nước');
  const htk = categories.find(c => c.name === 'Hủ Tiếu Khô');
  const combo = categories.find(c => c.name === 'Combo');

  const longDesc = `Điểm đặc biệt của hủ tiếu rau củ Xóm Tíu:
- Làm từ rau củ tự nhiên 100%, không phẩm màu, không chất bảo quản
- Màu sắc bắt mắt từ rau dền, bí đỏ, cà rốt, rau cải…
- Sợi hủ tiếu dai ngon, thơm mùi gạo mới, nấu lên vẫn giữ nguyên độ ngon!
- Dù là nấu nước , xào, hay trộn – hủ tiếu rau củ Xóm Tíu đều mang đến bữa ăn đậm đà, thanh lành và đầy dinh dưỡng!`;

  const products = [
    {
      name: 'Hủ tiếu tươi',
      price: 40000,
      stock: 100,
      status: 'Còn hàng',
      image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?q=80&w=200&auto=format&fit=crop',
      categoryId: htn ? htn.id : categories[0].id,
      shortDescription: `dai mềm tự nhiên, thơm vị rau củ. Giá 40.000đ / 1kg. Mua từ 5kg trở lên – miễn phí ship toàn khu vực Miền Tây!`,
      description: longDesc
    },
    {
      name: 'Hủ tiếu khô',
      price: 45000,
      stock: 100,
      status: 'Còn hàng',
      image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=200&auto=format&fit=crop',
      categoryId: htk ? htk.id : categories[0].id,
      shortDescription: `tiện lợi, để được lâu, giữ trọn hương vị. Giá 45.000đ / 0.5kg. Mua từ 3kg trở lên – miễn phí ship toàn khu vực Miền Tây!`,
      description: longDesc
    },
    {
      name: 'Hủ Tiếu Mix Xóm Tíu',
      price: 130000,
      stock: 50,
      status: 'Còn hàng',
      image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b485d?q=80&w=200&auto=format&fit=crop',
      categoryId: combo ? combo.id : categories[0].id,
      shortDescription: `kết hợp hủ tiếu khô và hủ tiếu tươi, mang trọn hương vị miền Tây trong từng sợi. Giá: 130.000đ / hộp`,
      description: longDesc
    }
  ];

  for (const prod of products) {
    await prisma.product.create({
      data: prod
    });
  }

  console.log('Đã tạo lại các sản phẩm với shortDescription và description thành công!');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
