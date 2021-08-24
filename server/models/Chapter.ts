import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Book } from './Book';

@Entity
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // stats_id

  // book_id
  @ManyToOne((type) => Book, (book) => book.chapters)
  @JoinColumn()
  book: Book;

  @CreateDateColumn({ type: 'timestamp' })
  created_at!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at!: Date;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'int' })
  sequence_num!: number; // Less than num parts

  @Column({ type: 'int' })
  num_parts!: number;

  @Column({ type: 'text' })
  text_body!: string;
}
