import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingController } from './training.controller';
import { Training } from './entities/training.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingExercise } from '../../common/entities/training-exercise.entity';
import { Exercise } from '../exercises/entities/exercise.entity';
import { UserIdMiddleware } from 'src/middlewares/user-id.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Training, TrainingExercise, Exercise])],
  controllers: [TrainingController],
  providers: [TrainingService],
  exports: [TrainingModule]
})
export class TrainingModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdMiddleware)
      .forRoutes({ path: 'v1/training', method: RequestMethod.ALL });
  }
}
