import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DailyTrainingService } from './daily-training.service';
import { DailyTrainingController } from './daily-training.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyTraining } from './entities/daily-training.entity';
import { UserIdMiddleware } from 'src/middlewares/user-id.middleware';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailyTraining]),
  ],
  controllers: [DailyTrainingController],
  providers: [DailyTrainingService],
})
export class DailyTrainingModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdMiddleware)
      .forRoutes({ path: 'v1/daily-training', method: RequestMethod.ALL });
  }
}
