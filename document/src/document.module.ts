import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { ParagraphService } from './paragraph/paragraph.service';
import { postgresOptions } from './db/postgres';
import { Document, Paragraph } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresOptions),
    TypeOrmModule.forFeature([Document, Paragraph]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService, ParagraphService],
})
export class DocumentModule {}
