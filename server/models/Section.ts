import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Chapter } from './Chapter';

@Entity()
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne((type) => Chapter, (chapter) => chapter.sections, {
    cascade: true
  })
  @JoinColumn()
  chapter!: Chapter;

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
