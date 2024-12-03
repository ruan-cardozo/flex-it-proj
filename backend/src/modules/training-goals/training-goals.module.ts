import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TrainingGoalsService } from './training-goals.service';
import { TrainingGoalsController } from './training-goals.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingGoal } from './entities/training-goal.entity';
import { UserIdMiddleware } from 'src/middlewares/user-id.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([TrainingGoal]),
  ],
  controllers: [TrainingGoalsController],
  providers: [TrainingGoalsService],
})
export class TrainingGoalsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdMiddleware)
      .forRoutes(
        { path: 'v1/training-goals', method: RequestMethod.ALL },
        { path: 'v1/training-goals/create-many', method: RequestMethod.POST }
      );
  }
}
