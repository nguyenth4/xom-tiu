const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const htn = await prisma.category.findUnique({ where: { name: 'Hủ Tiếu Nước' } });
  const htk = await prisma.category.findUnique({ where: { name: 'Hủ Tiếu Khô' } });

  if (htn && htk) {
    // Update products to point to Hủ Tiếu Khô
    await prisma.product.updateMany({
      where: { categoryId: htn.id },
      data: { categoryId: htk.id },
    });
    // Delete Hủ Tiếu Nước category
    await prisma.category.delete({ where: { id: htn.id } });
    console.log('Successfully merged Hủ Tiếu Nước into Hủ Tiếu Khô');
  } else if (htn && !htk) {
    // Just rename Hủ Tiếu Nước to Hủ Tiếu Khô
    await prisma.category.update({
      where: { id: htn.id },
      data: { name: 'Hủ Tiếu Khô' }
    });
    console.log('Successfully renamed Hủ Tiếu Nước to Hủ Tiếu Khô');
  } else {
    console.log('Hủ Tiếu Nước not found, nothing to do.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
