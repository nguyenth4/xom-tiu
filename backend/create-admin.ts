import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const existing = await prisma.user.findUnique({ where: { email: 'admin@xomtiu.com' }});
  if (!existing) {
    await prisma.user.create({
      data: {
        email: 'admin@xomtiu.com',
        password: 'admin',
        name: 'Admin',
        role: 'ADMIN'
      }
    });
    console.log('Admin created: admin@xomtiu.com / admin');
  } else {
    console.log('Admin already exists');
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());
