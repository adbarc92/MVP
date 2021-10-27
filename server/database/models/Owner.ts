import {
  Entity,
  Column,
  PrimaryColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany
} from 'typeorm';

import { Node } from './Node';

@Entity()
export class Owner {
  @PrimaryColumn()
  id!: string; // Corresponds to the Firebase ID

  @Column()
  email!: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;

  @OneToMany(() => Node, node => node.owner)
  nodes!: Node[];
}
