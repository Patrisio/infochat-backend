import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { ChatSettingsRule } from './chatSettingsRule.entity';

@Entity()
export class ChatSettingsCondition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  variant: string;

  @Column()
  operator: string;

  @Column()
  value: string;

  @ManyToOne(() => ChatSettingsRule, rule => rule.condition, { onDelete: 'CASCADE' })
  @JoinColumn([
    { name: "rule_id", referencedColumnName: "id" },
  ])
  rule: ChatSettingsRule;
}