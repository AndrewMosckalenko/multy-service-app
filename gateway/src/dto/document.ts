import { ApiProperty } from "@nestjs/swagger";

export class CreateDocumentDTO {
  @ApiProperty({ type: String })
  name: string;
}

export class CreateParagraphDTO {
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: Number })
  documentId: number;
  @ApiProperty({ type: String })
  content?: string;
  @ApiProperty({ type: Number })
  type?: number;
}

export class CreateTagDTO {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  title: string;
}

export class UpdateParagraphDTO {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  name: string;
  @ApiProperty({ type: String })
  content?: string;
}

export class UpdateDocumentDTO {
  @ApiProperty({ type: Number })
  id: number;
  @ApiProperty({ type: String })
  name: string;
}

export interface GetDocumentsDTO {}
