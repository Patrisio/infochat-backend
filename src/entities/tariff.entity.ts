import { BaseEntity, Entity, PrimaryGeneratedColumn, PrimaryColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Project } from './projects.entity';

@Entity()
export class Tariff extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 1 })
  operatorsCount: number;

  @Column({ default: 0 })
  chatCount: number;

  @Column({ default: 0 })
  templatesCount: number;

  @Column({ default: 0 })
  infochatLinkCount: number;

  @OneToOne(() => Project)
  @JoinColumn({ name: "project_id", referencedColumnName: "id" })
  project: number;
}