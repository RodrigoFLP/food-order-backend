import { Body } from '@nestjs/common';
import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';

import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Post()
  create(@Body() data: CreateCategoryDto) {
    console.log(data);
    return this.categoriesService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return 'this.productsService.update(+id, updateProductDto)';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'this.productsService.remove(+id)';
  }
}
