import { ParagraphType } from "src/entities/paragraph.entity"

export interface ICreateParagraphDTO {
    name: string;
    documentId: number;
    content?: string;
    type?: ParagraphType;
}