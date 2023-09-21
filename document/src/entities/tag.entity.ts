import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Paragraph } from './paragraph.entity';

export interface ITag {
  id: number;
  title: string;
  paragraph: Paragraph;
}

@Entity('tags')
export class Tag implements ITag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  title: string;

  @ManyToOne(() => Paragraph, (paragraph: Paragraph) => paragraph.tags)
  paragraph: Paragraph;
}
