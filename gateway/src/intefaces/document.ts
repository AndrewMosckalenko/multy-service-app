export interface ICreateDocumentDTO {
  name: string;
}

export interface ICreateParagraphDTO {
  name: string;
  documentId: number;
  content?: string;
  type?: number;
}

export interface IGetDocumentsDTO {}
