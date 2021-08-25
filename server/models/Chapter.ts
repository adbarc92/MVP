import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany
} from 'typeorm';
import { Book } from './Book';
import { Section } from './Section';
import { WritingStats } from './WritingStats';

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // stats_id

  @ManyToOne((type) => Book, (book) => book.chapters, {
    cascade: true
  })
  @JoinColumn()
  book!: Book;

  @ManyToOne((type) => WritingStats, (stats) => stats.chapters)
  @JoinColumn()
  stats!: WritingStats;

  @OneToMany((type) => Section, (section: Section) => section.chapter)
  sections!: Section[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'int' })
  sequence_num!: number;

  @Column({ type: 'int' })
  num_parts!: number;

  @Column({ type: 'text' })
  text_body!: string;
}
