import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from '../dto/create-tag.dto';
import { UpdateTagDto } from '../dto/update-tag.dto';
import { Tag } from '../entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  create(data: CreateTagDto) {
    const newTag = this.tagRepository.create(data);
    return this.tagRepository.save(newTag);
  }

  findAll() {
    return this.tagRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne(id, {
      relations: ['products'],
    });
    if (!tag) {
      throw new NotFoundException(`tag ${id} doesn't exist`);
    }
    return tag;
  }

  async update(id: number, changes: UpdateTagDto) {
    const tag = await this.tagRepository.findOne(id);

    if (!tag) {
      throw new NotFoundException(`tag ${id} doesn't exist`);
    }

    this.tagRepository.merge(tag, changes);

    return this.tagRepository.save(tag);
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.tagRepository.delete(id);
  }
}
