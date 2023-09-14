import { Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Paragraph } from '../entities';
import { ICreateParagraphDTO } from '../dto/paragraph';
import { DocumentService } from '../document.service';

@Injectable()
export class ParagraphService {

    constructor(
        @InjectRepository(Paragraph)
        private readonly paragraphRepository: Repository<Paragraph>,
    ) {}

    async createParagraph(createParagraphDto: ICreateParagraphDTO) {
        try {
            const newParagraph = await this.paragraphRepository.create({document: { id: createParagraphDto.documentId }, ...createParagraphDto});
            await this.paragraphRepository.save(newParagraph);

            return newParagraph;
        }
        catch(e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }
}
