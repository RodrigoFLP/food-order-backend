import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
  ) {}

  create(data: CreateProductDto) {
    const newProduct = this.productsRepository.create(data);
    return this.productsRepository.save(newProduct);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number) {
    const product = this.productsRepository.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product ${id} doesn't exist`);
    }
    return product;
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productsRepository.findOne(id);
    this.productsRepository.merge(product, changes);

    return this.productsRepository.save(product);
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
