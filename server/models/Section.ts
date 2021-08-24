import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity
export class Section {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // stats_id

  // book_id

  // pov_char

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int' })
  sequence_num: number;

  @Column({ type: 'text' })
  text_body: string;
}
