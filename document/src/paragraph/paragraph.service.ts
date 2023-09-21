import { Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Paragraph } from '../entities';
import { ICreateParagraphDTO, IUpdateParagraphDTO } from '../dto/paragraph';

@Injectable()
export class ParagraphService {
  constructor(
    @InjectRepository(Paragraph)
    private readonly paragraphRepository: Repository<Paragraph>,
  ) {}

  createParagraph(createParagraphDto: ICreateParagraphDTO) {
    try {
      return this.paragraphRepository.insert({
        document: { id: createParagraphDto.documentId },
        ...createParagraphDto,
      });
    } catch (e) {
      return {
        err: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  deleteParagraph(id: number) {
    try {
      this.paragraphRepository.delete({ id });
    } catch (e) {
      return {
        err: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  getParagraphById(id: number) {
    try {
      return this.paragraphRepository.findOneBy({ id });
    } catch (e) {}
  }

  async updateParagraph(id: number, updateParagraphDto: IUpdateParagraphDTO) {
    try {
      await this.paragraphRepository.update({ id }, updateParagraphDto);
      return this.getParagraphById(id);
    } catch (e) {
      return {
        err: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
