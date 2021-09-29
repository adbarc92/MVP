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

@Entity()
export class Chapter {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => Book, (book) => book.chapters, {
    cascade: true
  })
  @JoinColumn()
  book!: Book;

  @OneToMany((type) => Section, (section: Section) => section.chapter)
  sections!: Section[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @Column({ type: 'text' })
  name!: string;

  // @Column({ type: 'int'})
  // sequenceNum!: number;

  @Column({ type: 'text' })
  textBody!: string;
}
