import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Chapter } from './Chapter';
import { WritingStats } from './WritingStats';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // pov_char

  @ManyToOne((type) => WritingStats, (stats) => stats.sections)
  @JoinColumn()
  stats!: WritingStats;

  @ManyToOne((type) => Chapter, (chapter) => chapter.sections, {
    cascade: true,
  })
  @JoinColumn()
  chapter!: Chapter;

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
