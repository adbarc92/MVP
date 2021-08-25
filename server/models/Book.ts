import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Chapter } from './Chapter';
import { WritingStats } from './WritingStats';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => WritingStats, (stats) => stats.books)
  @JoinColumn()
  stats!: WritingStats;

  @OneToMany((type) => Chapter, (chapter: Chapter) => chapter.book, {
    cascade: true,
  })
  chapters!: Chapter[];

  @ManyToOne(
    (type) => WritingStats,
    (writingStats) => writingStats.books,
    { cascade: true }
  )
  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'int' })
  sequence_num!: number;

  @Column({ type: 'text' })
  text_body!: string;
}
