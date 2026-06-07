const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const emailsToDelete = [
    'nguyenhoang2B0004@gmail.com',
    'nguyen@gmail.com'
  ];

  for (const email of emailsToDelete) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: { orders: true }
      });

      if (user) {
        // Delete orders first if any exist due to foreign key constraints, though User is not cascade deleting orders
        // Actually, looking at the schema, Order has `user User @relation(fields: [userId], references: [id])`
        // Without onDelete: Cascade, we must delete orders first manually, or delete orderItems then orders.
        // Let's check if they have orders. The image shows "0" total orders for both. So we can just delete the user.
        await prisma.user.delete({
          where: { email }
        });
        console.log(`Deleted user: ${email}`);
      } else {
        console.log(`User not found: ${email}`);
      }
    } catch (error) {
      console.error(`Error deleting ${email}:`, error);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
