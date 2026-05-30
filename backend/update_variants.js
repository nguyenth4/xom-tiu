const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const product = await prisma.product.findFirst({
    where: { name: { contains: 'tươi', mode: 'insensitive' } }
  });

  if (product) {
    await prisma.product.update({
      where: { id: product.id },
      data: {
        variants: [
          { name: '1kg', price: 40000 },
          { name: 'Combo 2kg', price: 75000 },
          { name: 'Combo 3kg', price: 110000 }
        ]
      }
    });
    console.log('Successfully updated product: ' + product.name);
  } else {
    console.log('Product not found');
  }
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
