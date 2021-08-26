import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { Book } from './Book';
import { Chapter } from './Chapter';
import { Section } from './Section';

@Entity()
export class WritingStats {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany((type) => Book, (book) => book.stats)
  books!: Book[];

  @OneToMany((type) => Chapter, (chapter) => chapter.stats)
  chapters!: Chapter[];

  @OneToMany((type) => Section, (section) => section.stats)
  sections!: Section[];

  @Column({ type: 'int' })
  estimatedWordTotal!: number; // may not keep

  @Column({ type: 'time' })
  writingTime!: number; // ??

  @Column({ type: 'time' })
  thinkingTime!: number;

  @Column({ type: 'decimal' })
  dialogExpositionRatio!: number;
}
