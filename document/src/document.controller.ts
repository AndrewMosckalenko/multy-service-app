import { Controller } from '@nestjs/common';
import { DocumentService } from './document.service';
import { ParagraphService } from './paragraph/paragraph.service';
import { MessagePattern } from '@nestjs/microservices';
import { ICreateDocumentDTO } from './dto/document';
import { ICreateParagraphDTO } from './dto/paragraph';

@Controller()
export class DocumentController {

    constructor(
        private readonly documentService: DocumentService,
        private readonly paragraphService: ParagraphService,
    ) {}

    @MessagePattern('document_create')
    createDocument(createDocumentDto: ICreateDocumentDTO) {
        console.log(1)
        return this.documentService.createDocument(createDocumentDto);
    }

    @MessagePattern('document_get_by_id')
    getDocumentById(documentId: number) {
        return this.documentService.getDocumentById(documentId);
    }

    @MessagePattern('document_add_paragraph')
    addParagraphToDocument(createParagraphDto: ICreateParagraphDTO) {
        return this.paragraphService.createParagraph(createParagraphDto);
    }

    @MessagePattern('document_get_by_id_with_paragraphs')
    getDocumentWithParagraphsById(id: number) {
        return this.documentService.getDocumentWithParagraphsById(id);
    }

    @MessagePattern('document_get_all')
    getAllDocuments() {
        console.log(2)
        return this.documentService.getDocuments();
    }
}
