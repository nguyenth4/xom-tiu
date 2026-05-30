const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    // Check if variants is null or empty array, or if it lacks the 'name' field
    const hasVariants = product.variants && Array.isArray(product.variants) && product.variants.length > 0;
    
    if (!hasVariants) {
      const basePrice = product.price;
      // Calculate realistic combo prices
      const v1Price = basePrice;
      const v2Price = Math.round((basePrice * 1.8) / 1000) * 1000;
      const v3Price = Math.round((basePrice * 2.6) / 1000) * 1000;

      await prisma.product.update({
        where: { id: product.id },
        data: {
          variants: [
            { name: '1kg', price: v1Price },
            { name: 'Combo 2kg', price: v2Price },
            { name: 'Combo 3kg', price: v3Price }
          ]
        }
      });
      console.log(`Updated variants for: ${product.name}`);
    }
  }
}

run()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
