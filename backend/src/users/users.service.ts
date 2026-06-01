import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        orders: true,
      },
      orderBy: {
        createdAt: 'desc',
      }
    });

    return users.map(user => {
      const totalOrders = user.orders.length;
      const totalSpent = user.orders.reduce((sum, order) => sum + (order.total || 0), 0);
      const { password, orders, ...userWithoutPassword } = user;
      return {
        ...userWithoutPassword,
        totalOrders,
        totalSpent
      };
    });
  }

  async findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.user.create({ data });
  }

  async update(id: string, data: any) {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
