import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { Chapter } from './Chapter';
import { WritingStats } from './WritingStats';
import { Tag } from './Tag';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // pov_char

  @ManyToOne((type) => WritingStats, (stats) => stats.sections)
  @JoinColumn()
  stats!: WritingStats;

  @ManyToOne((type) => Chapter, (chapter) => chapter.sections, {
    cascade: true
  })
  @JoinColumn()
  chapter!: Chapter;

  @OneToOne((type) => Tag, { cascade: true })
  tag!: Tag;

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
