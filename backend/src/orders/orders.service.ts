import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.order.findMany({
      include: { user: true, items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findMyOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: 'desc' }
    });
  }

  async findOne(id: string) {
    return this.prisma.order.findUnique({
      where: { id },
      include: { user: true, items: { include: { product: true } } },
    });
  }

  async create(data: any) {
    const { items, userId, shippingAddress, phone, subtotal, total, status, paymentMethod } = data;
    
    return this.prisma.order.create({
      data: {
        userId,
        shippingAddress,
        phone,
        subtotal,
        total,
        status: status || 'Chờ xác nhận',
        paymentMethod: paymentMethod || 'COD',
        items: {
          create: items.map((item: any) => ({
            productId: parseInt(item.productId.toString()),
            quantity: item.quantity,
            price: item.price
          })),
        }
      },
      include: { items: true }
    });
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.order.update({ where: { id }, data: { status } });
  }

  async remove(id: string) {
    return this.prisma.order.delete({ where: { id } });
  }

  async getAnalytics() {
    const totalRevenueResult = await this.prisma.order.aggregate({
      _sum: { total: true },
      where: { status: 'Đã giao' }
    });
    const totalRevenue = totalRevenueResult._sum.total || 0;

    const totalOrders = await this.prisma.order.count();
    const totalUsers = await this.prisma.user.count();

    const last7Days = new Date();
    last7Days.setDate(last7Days.getDate() - 7);

    const recentOrders = await this.prisma.order.findMany({
      where: { createdAt: { gte: last7Days } },
      select: { createdAt: true, total: true }
    });

    const chartData: Record<string, number> = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' });
      chartData[dateStr] = 0;
    }

    recentOrders.forEach(order => {
      const dateStr = new Date(order.createdAt).toLocaleDateString('vi-VN', { month: '2-digit', day: '2-digit' });
      if (chartData[dateStr] !== undefined) {
        chartData[dateStr] += order.total;
      }
    });

    const revenueData = Object.keys(chartData).map(date => ({
      name: date,
      revenue: chartData[date]
    }));

    return {
      totalRevenue,
      totalOrders,
      totalUsers,
      revenueData
    };
  }
}
