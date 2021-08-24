import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity
export class WritingStats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  estimated_word_total: number; // may not keep

  @Column({ type: 'time' })
  writing_time: number; // ??

  @Column({ type: 'time' })
  thinking_time: number;

  @Column({ type: 'decimal' })
  dialog_exposition_ratio: number;
}
