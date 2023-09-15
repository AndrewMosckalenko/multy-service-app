import { Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Paragraph } from '../entities';
import { ICreateParagraphDTO } from '../dto/paragraph';

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
            return {
                err: true,
                message: e.message,
                status: HttpStatus.BAD_REQUEST,
            }
        }
    }
}
