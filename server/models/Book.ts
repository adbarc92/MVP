import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Chapter } from './Chapter';
import { WritingStats } from './WritingStats';

@Entity
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @ManyToOne((type) => WritingStats, stats=>)
  // @JoinColumn()
	// stats: number;

	@OneToMany((type) => Chapter, chapter => chapter.book)
	chapters: Chapter[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  sequence_num: number; // Less than num parts

  // @Column({ type: 'int' })
  // num_parts: number;

  @Column({ type: 'text' })
  text_body: string;
}
