import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(data: CreateProductDto) {
    const newProduct = this.productsRepository.create(data);

    //bind category to new product
    const categories = await this.categoriesRepository.findByIds(
      data.categoriesId,
    );

    if (categories.length < 1) {
      throw new NotFoundException(`categories don't exist`);
    }
    newProduct.categories = categories;

    return this.productsRepository.save(newProduct);
  }

  findAll() {
    return this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne(id);
    if (!product) {
      console.log('not found');
      throw new NotFoundException(`Product with id ${id} doesn't exist`);
    }

    return product;
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new NotFoundException(`Product with id ${id} doesn't exist`);
    }

    if (changes.categoriesId) {
      const categories = await this.categoriesRepository.findByIds(
        changes.categoriesId,
      );

      if (categories.length < 1) {
        throw new NotFoundException(`categories don't exist`);
      }
      product.categories = categories;
    }
    this.productsRepository.merge(product, changes);

    return this.productsRepository.save(product);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
