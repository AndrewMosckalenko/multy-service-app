import { Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Tag } from '../entities';
import { ICreateTagDTO } from '../dto/tag/create-tag-dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  createTag(id: number, createTagDto: ICreateTagDTO) {
    try {
      this.tagRepository.insert({ ...createTagDto, paragraph: { id } });
    } catch (e) {
      return {
        error: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  deleteTag(id: number) {
    try {
      this.tagRepository.delete({ id });
    } catch (e) {
      return {
        error: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
