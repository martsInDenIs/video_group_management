import { ApiProperty } from '@nestjs/swagger';
import { Group } from '@/groups/entities/group.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('videos')
export class Video {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier of the video',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Introduction to NestJS',
    description: 'The title of the video',
  })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Learn the basics of NestJS framework',
    description: 'The description of the video',
    required: false,
  })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({
    example: 'Learn the basics of NestJS framework',
    description: 'The description of the video',
  })
  @Column()
  url: string;

  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'The unique identifier of the group',
  })
  @Column({ type: 'uuid' })
  groupId: string;

  @ApiProperty({
    type: () => Group,
    description: 'The group that the video belongs to',
  })
  @ManyToOne(() => Group, (group) => group.id, { nullable: true })
  @JoinColumn({ name: 'groupId' })
  group: Group;
}
