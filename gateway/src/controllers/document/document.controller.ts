import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('document')
export class DocumentController {

    constructor(@Inject('DOCUMENT_SERVICE') private client: ClientProxy) {}
    
    @Post('/')
    createDocument(@Body() body) {
        return this.client.send('document_create', body);
    }

    @Post('/:id')
    addParagraphToDocument(@Param('id') id, @Body() body) {
        return this.client.send('document_add_paragraph', {...body, documentId: id});
    }

    @Get()
    getDocuments() {
        return this.client.send('document_get_all', {});
    }

    @Get('/:id')
    getDocumentById(@Param('id') id) {
        return this.client.send('document_get_by_id', id);
    }

    @Get('/:id/paragraphs')
    getDocumentWithParagraphsById(@Param('id') id) {
        return this.client.send('document_get_by_id_with_paragraphs', id);
    }
}

