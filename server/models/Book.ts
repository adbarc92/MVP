import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Chapter } from './Chapter';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

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
