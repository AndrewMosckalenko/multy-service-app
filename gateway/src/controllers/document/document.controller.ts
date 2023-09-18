import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { sendRequestToMicroservice } from '../../utils';
import { 
    DOCUMENT_ADD_PARAGRAPH_MESSAGE_PATTERN, 
    DOCUMENT_CREATE_MESSAGE_PATTERN, 
    DOCUMENT_GET_ALL_MESSAGE_PATTERN, 
    DOCUMENT_GET_BY_ID_MESSAGE_PATTERN, 
    DOCUMENT_GET_BY_ID_WITH_PARAGRAPHS_MESSAGE_PATTERN 
} from '../../constants';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('Documents api')
@UseGuards(JwtAuthGuard)
@Controller('document')
export class DocumentController {

    constructor(@Inject('DOCUMENT_SERVICE') private client: ClientProxy) {}
    
    @Post('/')
    createDocument(@Body() body) {
        return sendRequestToMicroservice(this.client, DOCUMENT_CREATE_MESSAGE_PATTERN, body);
    }

    @Post('/:id')
    addParagraphToDocument(@Param('id') id, @Body() body) {
        return sendRequestToMicroservice(this.client, DOCUMENT_ADD_PARAGRAPH_MESSAGE_PATTERN, {...body, documentId: id});
    }

    @Get()
    getDocuments() {
        return sendRequestToMicroservice(this.client, DOCUMENT_GET_ALL_MESSAGE_PATTERN, {});
    }

    @Get('/:id')
    getDocumentById(@Param('id') id) {
        return sendRequestToMicroservice(this.client, DOCUMENT_GET_BY_ID_MESSAGE_PATTERN, id);
    }

    @Get('/:id/paragraphs')
    getDocumentWithParagraphsById(@Param('id') id) {
        return sendRequestToMicroservice(this.client, DOCUMENT_GET_BY_ID_WITH_PARAGRAPHS_MESSAGE_PATTERN, id);
    }
}

