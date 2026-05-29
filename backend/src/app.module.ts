import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { ArticlesModule } from './articles/articles.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UsersModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    ArticlesModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
