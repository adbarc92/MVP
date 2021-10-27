import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  TreeParent,
  TreeChildren,
  Tree,
  ManyToOne
} from 'typeorm';

import { Owner } from './Owner';

@Tree('materialized-path')
@Entity({ name: 'Node' })
export class Node {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @TreeParent()
  parent!: Node;

  @TreeChildren()
  children!: Node[];

  @ManyToOne(() => Owner, owner => owner.nodes)
  owner!: Owner;
}
