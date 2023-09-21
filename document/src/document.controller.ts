import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { DocumentService } from './document.service';
import { ParagraphService } from './paragraph/paragraph.service';
import { ICreateDocumentDTO, IUpdateDocumentDTO } from './dto/document';
import { ICreateParagraphDTO, IUpdateParagraphDTO } from './dto/paragraph';
import {
  DOCUMENT_ADD_PARAGRAPH_MESSAGE_PATTERN,
  DOCUMENT_CREATE_MESSAGE_PATTERN,
  DOCUMENT_CREATE_TAG_MESSAGE_PATTERN,
  DOCUMENT_DELETE_MESSAGE_PATTERN,
  DOCUMENT_DELETE_PARAGRAPH_MESSAGE_PATTERN,
  DOCUMENT_DELETE_TAG_MESSAGE_PATTERN,
  DOCUMENT_GET_ALL_MESSAGE_PATTERN,
  DOCUMENT_GET_BY_ID_MESSAGE_PATTERN,
  DOCUMENT_GET_BY_ID_WITH_PARAGRAPHS_MESSAGE_PATTERN,
  DOCUMENT_UPDATE_MESSAGE_PATTERN,
  DOCUMENT_UPDATE_PARAGRAPH_MESSAGE_PATTERN,
} from './constants';
import { ICreateTagDTO } from './dto/tag/create-tag-dto';
import { TagService } from './tag/tag.service';

@Controller()
export class DocumentController {
  constructor(
    private readonly documentService: DocumentService,
    private readonly paragraphService: ParagraphService,
    private readonly tagService: TagService,
  ) {}

  @MessagePattern(DOCUMENT_CREATE_MESSAGE_PATTERN)
  createDocument(createDocumentDto: ICreateDocumentDTO) {
    return this.documentService.createDocument(createDocumentDto);
  }

  @MessagePattern(DOCUMENT_GET_BY_ID_MESSAGE_PATTERN)
  getDocumentById(documentId: number) {
    return this.documentService.getDocumentById(documentId);
  }

  @MessagePattern(DOCUMENT_ADD_PARAGRAPH_MESSAGE_PATTERN)
  addParagraphToDocument(createParagraphDto: ICreateParagraphDTO) {
    return this.paragraphService.createParagraph(createParagraphDto);
  }

  @MessagePattern(DOCUMENT_GET_BY_ID_WITH_PARAGRAPHS_MESSAGE_PATTERN)
  getDocumentWithParagraphsById(id: number) {
    return this.documentService.getDocumentWithParagraphsById(id);
  }

  @MessagePattern(DOCUMENT_GET_ALL_MESSAGE_PATTERN)
  getAllDocuments() {
    return this.documentService.getDocuments();
  }

  @MessagePattern(DOCUMENT_DELETE_MESSAGE_PATTERN)
  deleteDocument(id: number) {
    return this.documentService.deleteDocument(id);
  }

  @MessagePattern(DOCUMENT_DELETE_PARAGRAPH_MESSAGE_PATTERN)
  deleteParagraph(id: number) {
    return this.paragraphService.deleteParagraph(id);
  }

  @MessagePattern(DOCUMENT_UPDATE_MESSAGE_PATTERN)
  updateDocument(updateDocumentDto: IUpdateDocumentDTO) {
    return this.documentService.updateDocument(
      updateDocumentDto.id,
      updateDocumentDto,
    );
  }

  @MessagePattern(DOCUMENT_UPDATE_PARAGRAPH_MESSAGE_PATTERN)
  updateParagraph(updateParagraphDto: IUpdateParagraphDTO) {
    return this.paragraphService.updateParagraph(
      updateParagraphDto.id,
      updateParagraphDto,
    );
  }

  @MessagePattern(DOCUMENT_CREATE_TAG_MESSAGE_PATTERN)
  createTag(createTagDto: ICreateTagDTO) {
    return this.tagService.createTag(createTagDto.id, createTagDto);
  }

  @MessagePattern(DOCUMENT_DELETE_TAG_MESSAGE_PATTERN)
  deleteTag(id: number) {
    return this.tagService.deleteTag(id);
  }
}
