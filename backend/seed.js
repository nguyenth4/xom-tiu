const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const categories = ['Hủ Tiếu Nước', 'Hủ Tiếu Khô', 'Combo', 'Đồ uống'];
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }
  
  // Seed sample products
  const htn = await prisma.category.findUnique({ where: { name: 'Hủ Tiếu Nước' } });
  
  if (htn) {
      await prisma.product.create({
        data: {
            name: 'Hủ Tiếu Tươi Đặc Biệt',
            price: 85000,
            stock: 45,
            status: 'Còn hàng',
            image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?q=80&w=200&auto=format&fit=crop',
            categoryId: htn.id
        }
      });
  }
  console.log('Seeded categories and a product.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
