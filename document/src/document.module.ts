import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { ParagraphService } from './paragraph/paragraph.service';
import { postgresOptions } from './db/postgres';
import { Document, Paragraph, Tag } from './entities';
import { TagService } from './tag/tag.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(postgresOptions),
    TypeOrmModule.forFeature([Document, Paragraph, Tag]),
  ],
  controllers: [DocumentController],
  providers: [DocumentService, ParagraphService, TagService],
})
export class DocumentModule {}
