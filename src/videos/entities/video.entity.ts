import { Group } from 'src/groups/entities/group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('videos')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column({ type: 'uuid' })
  groupId: string;

  @ManyToOne(() => Group, (group) => group.id, { nullable: true })
  @JoinColumn({ name: 'groupId' })
  group: Group;
}
