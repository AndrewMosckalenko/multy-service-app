import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Document } from './document.entity';
import { Tag } from './tag.entity';

export interface IParagraph {
  id: number;
  name: string;
  content: string;
  type: number;
  document: Document;
  tags: Tag[];
}

export enum ParagraphType {
  Text = 1,
  Link,
  Picture,
  Media,
}

@Entity('paragraphs')
export class Paragraph implements IParagraph {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, default: 'untitled' })
  name: string;

  @Column({ nullable: false, default: '' })
  content: string;

  @Column({ nullable: false, default: ParagraphType.Text })
  type: ParagraphType;

  @ManyToOne(() => Document, (document: Document) => document.paragraphs)
  document: Document;

  @OneToMany(() => Tag, (tag: Tag) => tag.paragraph)
  tags: Tag[];
}
