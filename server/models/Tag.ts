import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { Node } from './Node';
import { Section } from './Section';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToOne((type) => Section)
  @JoinColumn()
  section!: Section;

  @OneToOne((type) => Node)
  @JoinColumn()
  node!: Node;

  shouldAdd!: boolean;
}
