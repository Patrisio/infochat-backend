import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Project } from './projects.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToMany(type => Project, project => project.users)
  projects: Project[];

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  phone: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  salt: string;

  @Column({ nullable: true })
  balance: number;

  @Column()
  role: string;

  @Column()
  status: string;

  @Column({ default: false })
  isOnline: boolean;

  @Column({ nullable: true })
  timezone: string;

  async validatePassword(password: string): Promise<Boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}