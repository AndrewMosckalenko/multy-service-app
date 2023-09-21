import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Document, IDocument } from './entities';
import { ICreateDocumentDTO, IUpdateDocumentDTO } from './dto/document';
import { IErrorMessage } from './interfaces';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepository: Repository<Document>,
  ) {}

  createDocument(
    createDocumentDTO: ICreateDocumentDTO,
  ): Promise<void> | IErrorMessage {
    try {
      this.documentRepository.insert(createDocumentDTO);
    } catch (e) {
      return {
        error: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  getDocumentById(id: number): Promise<IDocument> | IErrorMessage {
    try {
      return this.documentRepository.findOneBy({ id });
    } catch (e) {
      return {
        error: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async getDocumentWithParagraphsById(
    id: number,
  ): Promise<IDocument | IErrorMessage> {
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
    } catch (e) {
      return {
        error: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  getDocuments(): Promise<IDocument[]> | IErrorMessage {
    try {
      return this.documentRepository.find();
    } catch (e) {
      return {
        error: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async updateDocument(
    id: number,
    updateDocumentDto: IUpdateDocumentDTO,
  ): Promise<IDocument | IErrorMessage> {
    try {
      await this.documentRepository.update({ id }, updateDocumentDto);
      return this.getDocumentById(id);
    } catch (e) {
      return {
        error: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  deleteDocument(id: number): Promise<void> | IErrorMessage {
    try {
      this.documentRepository.delete({ id });
    } catch (e) {
      return {
        error: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }

  async copyDocument(id: number): Promise<void | IErrorMessage> {
    try {
      const prototypeDocument = await this.getDocumentById(id);

      if ('message' in prototypeDocument)
        throw new HttpException(
          prototypeDocument.message,
          prototypeDocument.status,
        );

      this.createDocument({ name: prototypeDocument.name });
    } catch (e) {
      return {
        error: true,
        message: e.message,
        status: HttpStatus.BAD_REQUEST,
      };
    }
  }
}
