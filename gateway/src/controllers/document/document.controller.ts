import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';

import { sendRequestToMicroservice } from '../../utils';
import {
  DOCUMENT_ADD_PARAGRAPH_MESSAGE_PATTERN,
  DOCUMENT_CREATE_MESSAGE_PATTERN,
  DOCUMENT_DELETE_MESSAGE_PATTERN,
  DOCUMENT_DELETE_PARAGRAPH_MESSAGE_PATTERN,
  DOCUMENT_GET_ALL_MESSAGE_PATTERN,
  DOCUMENT_GET_BY_ID_MESSAGE_PATTERN,
  DOCUMENT_GET_BY_ID_WITH_PARAGRAPHS_MESSAGE_PATTERN,
  DOCUMENT_UPDATE_MESSAGE_PATTERN,
  DOCUMENT_UPDATE_PARAGRAPH_MESSAGE_PATTERN,
} from '../../constants';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import {
  ICreateDocumentDTO,
  ICreateParagraphDTO,
  IGetDocumentsDTO,
} from '../../intefaces';

@ApiTags('Documents api')
@UseGuards(JwtAuthGuard)
@Controller('document')
export class DocumentController {
  constructor(@Inject('DOCUMENT_SERVICE') private client: ClientProxy) {}

  @Post()
  createDocument(@Body() body: ICreateDocumentDTO) {
    return sendRequestToMicroservice<ICreateDocumentDTO>(
      this.client,
      DOCUMENT_CREATE_MESSAGE_PATTERN,
      body,
    );
  }

  @Post('/:id')
  addParagraphToDocument(@Param('id', ParseIntPipe) id, @Body() body) {
    return sendRequestToMicroservice<ICreateParagraphDTO>(
      this.client,
      DOCUMENT_ADD_PARAGRAPH_MESSAGE_PATTERN,
      { ...body, documentId: id },
    );
  }

  @Get()
  getDocuments() {
    return sendRequestToMicroservice<IGetDocumentsDTO>(
      this.client,
      DOCUMENT_GET_ALL_MESSAGE_PATTERN,
      {},
    );
  }

  @Get('/:id')
  getDocumentById(@Param('id', ParseIntPipe) id: number) {
    return sendRequestToMicroservice<number>(
      this.client,
      DOCUMENT_GET_BY_ID_MESSAGE_PATTERN,
      id,
    );
  }

  @Get('/:id/paragraphs')
  getDocumentWithParagraphsById(@Param('id', ParseIntPipe) id: number) {
    return sendRequestToMicroservice<number>(
      this.client,
      DOCUMENT_GET_BY_ID_WITH_PARAGRAPHS_MESSAGE_PATTERN,
      id,
    );
  }

  @Delete('/:id')
  deleteDocument(@Param('id', ParseIntPipe) id: number) {
    return sendRequestToMicroservice<number>(
      this.client,
      DOCUMENT_DELETE_MESSAGE_PATTERN,
      id,
    );
  }

  @Delete('/paragraph/:id')
  deleteParagraph(@Param('id', ParseIntPipe) id: number) {
    return sendRequestToMicroservice<number>(
      this.client,
      DOCUMENT_DELETE_PARAGRAPH_MESSAGE_PATTERN,
      id,
    );
  }

  @Patch('/:id')
  updateDocument(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return sendRequestToMicroservice(
      this.client,
      DOCUMENT_UPDATE_MESSAGE_PATTERN,
      { id, ...body },
    );
  }

  @Patch('/paragraph/:id')
  updateParagraph(@Param('id', ParseIntPipe) id: number, @Body() body) {
    return sendRequestToMicroservice(
      this.client,
      DOCUMENT_UPDATE_PARAGRAPH_MESSAGE_PATTERN,
      { id, ...body },
    );
  }
}
