const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const drink = await prisma.category.findUnique({ where: { name: 'Đồ uống' } });
  if (drink) {
    // Delete any products inside it first (if any)
    await prisma.product.deleteMany({ where: { categoryId: drink.id } });
    await prisma.category.delete({ where: { id: drink.id } });
    console.log('Deleted category "Đồ uống" and any associated products.');
  } else {
    console.log('Category "Đồ uống" not found.');
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
