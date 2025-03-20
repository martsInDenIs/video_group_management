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
import { Video } from '../../videos/entities/video.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('groups')
export class Group {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier of the group',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Marketing Team',
    description: 'The name of the group',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Marketing department team',
    description: 'The description of the group',
    required: false,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The ID of the parent group',
    required: false,
  })
  @Column({ nullable: true })
  parentId: string;

  @ApiProperty({
    type: () => Group,
    description: 'The parent group',
    required: false,
  })
  @ManyToOne(() => Group, (group) => group.children)
  @JoinColumn({ name: 'parentId' })
  parent: Group;

  @ApiProperty({
    type: () => [Group],
    description: 'The child groups',
  })
  @OneToMany(() => Group, (group) => group.parent)
  children: Group[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Video, (video) => video.groupId)
  videos: Video[];
}
