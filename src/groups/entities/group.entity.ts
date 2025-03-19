import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Video } from 'src/videos/entities/video.entity';
@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Group, (group) => group.parentId)
  @JoinColumn({ name: 'parentId' })
  parent: Group;

  @Column({ nullable: true })
  parentId: string;

  @OneToMany(() => Group, (group) => group.parent)
  children: Group[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Video, (video) => video.groupId)
  videos: Video[];
}
