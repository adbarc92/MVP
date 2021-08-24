import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // @OneToOne()
  // @JoinColumn()

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  name: string;

  @Column()
  sequence_num: number; // Less than num parts

  @Column()
  num_parts: number;

  @Column()
  text_body: string;
}
