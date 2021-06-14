import { BaseEntity, Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Project } from './projects.entity';

@Entity()
export class Template extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  message: string

  @ManyToOne(() => Project, project => project.templates)
  @JoinColumn([
    { name: "project_id", referencedColumnName: "id" },
  ])
  project: number;
}