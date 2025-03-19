import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../role.enum';
import { Expose } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Expose()
  @Column({ default: Role.Viewer })
  role: Role;
}
