import { Controller, Get, Post, UseInterceptors, UploadedFile, BadRequestException, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { extname } from 'path';
import { createClient } from '@supabase/supabase-js';

@Controller()
export class AppController {
  private supabase;

  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {
    const supabaseUrl = process.env.SUPABASE_URL || '';
    const supabaseKey = process.env.SUPABASE_KEY || '';
    if (supabaseUrl && supabaseKey) {
      this.supabase = createClient(supabaseUrl, supabaseKey);
    } else {
      console.warn('Supabase URL or Key is missing. Image upload to Supabase will not work.');
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  async login(@Body() body: any) {
    const { email, password } = body;
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || user.password !== password) {
      throw new BadRequestException('Email hoặc mật khẩu không chính xác');
    }
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    return { token, user };
  }

  @Post('auth/register')
  async register(@Body() body: any) {
    const { name, email, password } = body;
    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new BadRequestException('Email đã được sử dụng');
    }
    const user = await this.prisma.user.create({
      data: { name, email, password, role: 'CUSTOMER' }
    });
    const payload = { email: user.email, sub: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    return { token, user };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage()
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    if (!this.supabase) {
      throw new BadRequestException('Supabase storage is not configured');
    }

    const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
    const fileName = `${randomName}${extname(file.originalname)}`;

    // Upload to Supabase Storage
    const { data, error } = await this.supabase.storage
      .from('images') // Ensure 'images' bucket exists and is set to Public
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false
      });

    if (error) {
      console.error('Upload to Supabase failed:', error);
      throw new BadRequestException('Failed to upload image');
    }

    const { data: publicUrlData } = this.supabase.storage
      .from('images')
      .getPublicUrl(fileName);

    return { url: publicUrlData.publicUrl };
  }
}
