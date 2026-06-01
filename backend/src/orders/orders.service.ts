import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.order.findMany({
      include: { user: true, items: { include: { product: true } } },
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
}
