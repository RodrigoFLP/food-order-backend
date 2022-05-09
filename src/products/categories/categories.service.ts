import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { Category } from '../entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(data);
    return this.categoryRepository.save(newCategory);
  }

  findAll() {
    return this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne(id, {
      relations: ['products'],
    });
    if (!category) {
      throw new NotFoundException(`category ${id} doesn't exist`);
    }
    return category;
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new NotFoundException(`category ${id} doesn't exist`);
    }

    this.categoryRepository.merge(category, changes);

    return this.categoryRepository.save(category);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.categoryRepository.delete(id);
  }
}
