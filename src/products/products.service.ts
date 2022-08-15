import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreateProductDto, Tags } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from './entities/category.entity';
import { Product } from './entities/product.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Category)
    private tagCategoriesRepository: Repository<Tag>,
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

  findAll(take: number, skip: number) {
    return this.productsRepository.find({
      relations: ['categories', 'tagsCategories'],
      order: { id: 'ASC' },
      take: take,
      skip: skip,
    });
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne(id, {
      relations: ['categories', 'tagsCategories'],
    });
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

    if (!!changes.tagsCategoriesId && changes.tagsCategoriesId.length !== 0) {
      const tagsCategories = await this.tagCategoriesRepository.findByIds(
        changes.tagsCategoriesId,
      );

      if (tagsCategories.length < 1) {
        throw new NotFoundException(`tags don't exist`);
      }
      product.tagsCategories = tagsCategories;
    }

    if (changes.tagsCategoriesId.length === 0) {
      product.tagsCategories = [];
    }

    this.productsRepository.merge(product, changes);

    return this.productsRepository.save(product);
  }

  async searchProducts(keyword: string, take: number, skip: number) {
    // const result = await this.productsRepository
    //   .createQueryBuilder()
    //   .select()
    //   .where('name ILIKE :searchTerm', { searchTerm: `%${searchTerm}%` })
    //   .getMany();

    const result = await this.productsRepository.findAndCount({
      where: { name: ILike('%' + keyword + '%') },
      order: { name: 'DESC' },
      take: take,
      skip: skip,
    });

    return { result: result[0], count: result[1] };
  }

  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
