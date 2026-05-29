import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.article.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: number) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  async create(data: any) {
    return this.prisma.article.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.article.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
