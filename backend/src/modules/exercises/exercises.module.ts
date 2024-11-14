import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { ExercisesController } from './exercises.controller';
import { Exercise } from './entities/exercise.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingExercise } from '../../common/entities/training-exercise.entity';
import { UserIdMiddleware } from 'src/middlewares/user-id.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Exercise, TrainingExercise])],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesModule]
})
export class ExercisesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdMiddleware)
      .forRoutes({ path: 'v1/exercises', method: RequestMethod.ALL });
  }
}
