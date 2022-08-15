import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';

import { CategoriesController } from './categories/categories.controller';
import { CategoriesService } from './categories/categories.service';
import { Category } from './entities/category.entity';
import { TagsService } from './tags/tags.service';
import { TagsController } from './tags/tags.controller';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Tag])],
  controllers: [ProductsController, CategoriesController, TagsController],
  providers: [ProductsService, CategoriesService, TagsService],
  exports: [ProductsService, TagsService],
})
export class ProductsModule {}
