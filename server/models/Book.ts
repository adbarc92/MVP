import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Chapter } from './Chapter';
import { WritingStats } from './WritingStats';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => WritingStats, (stats) => stats.books, {
    cascade: true
  })
  @JoinColumn()
  stats!: WritingStats;

  @OneToMany((type) => Chapter, (chapter: Chapter) => chapter.book)
  chapters!: Chapter[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'int' })
  sequenceNum!: number;

  @Column({ type: 'text' })
  textBody!: string;
}
