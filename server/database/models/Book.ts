import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm';
import { Chapter } from './Chapter';
// import { Owner } from './Owner';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  // @ManyToOne(type => Owner, (owner: Owner) =>)
  // owner_id!: string;

  @OneToMany(type => Chapter, (chapter: Chapter) => chapter.book)
  chapters!: Chapter[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  textBody!: string;
}
