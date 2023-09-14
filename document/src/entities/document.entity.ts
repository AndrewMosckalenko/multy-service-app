import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IParagraph, Paragraph } from "./paragraph.entity";

export interface IDocument {
    id: number;
    name: string;
    paragraphs: IParagraph[];
}

@Entity('documents')
export class Document implements IDocument {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false, default: 'untitled'})
    name: string;

    @OneToMany(() => Paragraph, (paragraph: Paragraph) => paragraph.document)
    paragraphs: IParagraph[];

}