import { Module } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { Exercise } from './entities/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingExercise } from '../../common/entities/training-exercise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, TrainingExercise])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesModule]
})
export class ExercisesModule {}
