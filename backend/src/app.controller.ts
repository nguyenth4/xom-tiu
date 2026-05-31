import { Controller, Get, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { extname } from 'path';
import { createClient } from '@supabase/supabase-js';

@Controller()
export class AppController {
  private supabase;

  constructor(private readonly appService: AppService) {
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
