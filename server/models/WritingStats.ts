import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Book } from './Book';
import { Chapter } from './Chapter';
import { Section } from './Section';

@Entity
export class WritingStats {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany((type) => Book, (book) => book.stats, {
    cascade: true,
  })
  books!: Book[];

  @OneToMany((type) => Chapter, (chapter) => chapter.stats, {
    cascade: true,
  })
  chapters!: Chapter[];

  @OneToMany((type) => Section, (section) => section.stats, {
    cascade: true,
  })
  sections!: Section[];

  @Column({ type: 'int' })
  estimated_word_total!: number; // may not keep

  @Column({ type: 'time' })
  writing_time!: number; // ??

  @Column({ type: 'time' })
  thinking_time!: number;

  @Column({ type: 'decimal' })
  dialog_exposition_ratio!: number;
}
