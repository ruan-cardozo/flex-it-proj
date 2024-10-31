import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Training } from 'src/modules/training/entities/training.entity';
import { Exercise } from 'src/modules/exercises/entities/exercise.entity';

@Entity()
export class TrainingExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Training, training => training.trainingExercises, { onDelete: 'CASCADE' })
  training: Training;

  @ManyToOne(() => Exercise, exercise => exercise.trainingExercises, { onDelete: 'CASCADE' })
  exercise: Exercise;
}