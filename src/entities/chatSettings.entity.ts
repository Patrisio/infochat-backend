import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Project } from './projects.entity';

interface Operator {
  id: string,
  value: string,
}

@Entity()
export class ChatSettings extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chatName?: string;

  @Column()
  greeting?: string

  @Column()
  backgroundImage?: number

  @Column()
  buttonLocation?: string;

  @Column()
  buttonScale?: string

  @Column()
  buttonWidth?: number

  @Column()
  buttonText?: string

  @Column()
  infochatLinkEnabled?: number

  @Column()
  customCss?: string

  @Column({ nullable: true })
  timezone?: string

  @Column()
  requestText?: string

  @Column()
  responseTimeText?: string

  @Column({ default: 10 })
  timeWithoutAnswer?: number
}