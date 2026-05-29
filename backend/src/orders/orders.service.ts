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
    // In a real scenario, you'd extract items and create them properly.
    // Assuming data contains userId, shippingAddress, subtotal, total, and an array of items
    const { items, ...orderData } = data;
    
    return this.prisma.order.create({
      data: {
        ...orderData,
        items: {
          create: items, // expects { productId, quantity, price }
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
