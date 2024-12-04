// src/training/entities/daily-workout.entity.ts
import { Entity, Column, ManyToOne } from 'typeorm';
import { Training } from '../../training/entities/training.entity';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class DailyTraining extends BaseEntity {

  @Column()
  day: number;

  @ManyToOne(() => Training, training => training.dailyTraining)
  training: Training;
}