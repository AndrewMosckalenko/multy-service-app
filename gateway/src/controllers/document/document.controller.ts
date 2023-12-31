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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { sendRequestToMicroservice } from '../../utils';
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
} from '../../constants';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import {
  CreateDocumentDTO,
  CreateParagraphDTO,
  CreateTagDTO,
  GetDocumentsDTO,
  UpdateDocumentDTO,
  UpdateParagraphDTO,
} from '../../dto';


@ApiTags('Documents api')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('document')
export class DocumentController {
  constructor(@Inject('DOCUMENT_SERVICE') private client: ClientProxy) {}

  @Post()
  createDocument(@Body() body: CreateDocumentDTO) {
    return sendRequestToMicroservice<CreateDocumentDTO>(
      this.client,
      DOCUMENT_CREATE_MESSAGE_PATTERN,
      body,
    );
  }

  @Post('/:id')
  addParagraphToDocument(@Param('id', ParseIntPipe) id: number, @Body() body: CreateParagraphDTO) {
    return sendRequestToMicroservice<CreateParagraphDTO>(
      this.client,
      DOCUMENT_ADD_PARAGRAPH_MESSAGE_PATTERN,
      { ...body, documentId: id },
    );
  }

  @Get()
  getDocuments() {
    return sendRequestToMicroservice<GetDocumentsDTO>(
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
  updateDocument(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateDocumentDTO) {
    return sendRequestToMicroservice(
      this.client,
      DOCUMENT_UPDATE_MESSAGE_PATTERN,
      { id, ...body },
    );
  }

  @Patch('/paragraph/:id')
  updateParagraph(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateParagraphDTO) {
    return sendRequestToMicroservice(
      this.client,
      DOCUMENT_UPDATE_PARAGRAPH_MESSAGE_PATTERN,
      { id, ...body },
    );
  }

  @Post('/:id/tag')
  createTag(@Param('id', ParseIntPipe) id: number, @Body() body: CreateTagDTO) {
    return sendRequestToMicroservice(
      this.client,
      DOCUMENT_CREATE_TAG_MESSAGE_PATTERN,
      { id, ...body },
    );
  }

  @Delete('/:id/tag')
  deleteTag(@Param('id', ParseIntPipe) id: number) {
    return sendRequestToMicroservice(
      this.client,
      DOCUMENT_DELETE_TAG_MESSAGE_PATTERN,
      id,
    );
  }
}
