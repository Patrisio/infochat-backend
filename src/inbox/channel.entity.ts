import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Project } from '../auth/projects.entity';

@Entity()
export class Channel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: string

  @ManyToOne(() => Project, project => project.channels)
  @JoinColumn([
    { name: "project_id", referencedColumnName: "id" },
  ])
  project: Project;
}