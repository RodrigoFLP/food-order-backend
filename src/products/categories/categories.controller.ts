import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  @Get()
  findAll() {
    return 'return all categories'; //TODO: return
  }

  @Post()
  create() {
    return 'create new category'; //TODO: create category
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'this.productsService.findOne(+id);';
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
