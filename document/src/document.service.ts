import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';

import { Document } from './entities';
import { ICreateDocumentDTO } from './dto/document';


@Injectable()
export class DocumentService {

    constructor(
        @InjectRepository(Document)
        private readonly documentRepository: Repository<Document>,
    ) {}

    async createDocument(createDocumentDTO: ICreateDocumentDTO) {
        try {
            const newDocument = await this.documentRepository.create(createDocumentDTO);
            await this.documentRepository.save(newDocument);

            return newDocument;
        }
        catch(e) {
            return {
                err: true,
                message: e.message,
                status: HttpStatus.BAD_REQUEST,
            }
        }
    }

    getDocumentById(id: number) {
        try {
            return this.documentRepository.findOneBy({ id });
        }
        catch(e) {
            return {
                err: true,
                message: e.message,
                status: HttpStatus.BAD_REQUEST,
            }
        }
    }

    async getDocumentWithParagraphsById(id: number) {
        try {
            const document = await this.documentRepository.findOne({ 
                join: {
                    alias: 'document',
                    leftJoinAndSelect: {
                        paragraph: 'document.paragraphs',
                    },
                },
                where: { id },
            });
            return document;
        }   
        catch(e) {
            return {
                err: true,
                message: e.message,
                status: HttpStatus.BAD_REQUEST,
            }
        }
    }

    getDocuments() {
        try {
            return this.documentRepository.find();
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
