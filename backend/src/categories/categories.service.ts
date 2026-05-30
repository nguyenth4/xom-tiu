import { Injectable, ConflictException, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.category.findMany({
      include: {
        _count: {
          select: { products: true }
        }
      }
    });
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException('Danh mục không tồn tại');
    }
    return category;
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const existing = await this.prisma.category.findUnique({
      where: { name: createCategoryDto.name }
    });
    
    if (existing) {
      throw new ConflictException('Tên danh mục đã tồn tại');
    }

    return this.prisma.category.create({ 
      data: createCategoryDto 
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.findOne(id);

    if (updateCategoryDto.name) {
      const existing = await this.prisma.category.findUnique({
        where: { name: updateCategoryDto.name }
      });
      
      if (existing && existing.id !== id) {
        throw new ConflictException('Tên danh mục đã tồn tại');
      }
    }

    return this.prisma.category.update({ 
      where: { id }, 
      data: updateCategoryDto 
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const productCount = await this.prisma.product.count({
      where: { categoryId: id }
    });

    if (productCount > 0) {
      throw new BadRequestException('Không thể xóa danh mục đang có sản phẩm');
    }

    return this.prisma.category.delete({ where: { id } });
  }
}
