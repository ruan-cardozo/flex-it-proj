import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DailyTrainingService } from './daily-training.service';
import { DailyTrainingController } from './daily-training.controller';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyTraining } from './entities/daily-training.entity';
import { UserIdMiddleware } from 'src/middlewares/user-id.middleware';
import { DailyTrainingRepository } from './daily-training.repository';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailyTraining]),
  ],
  controllers: [DailyTrainingController],
  providers: [DailyTrainingService,
    {
      provide: 'DailyTrainingRepository',
      useFactory: (dataSource: DataSource) => new DailyTrainingRepository(dataSource),
      inject: [DataSource],
    },
  ],
})
export class DailyTrainingModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserIdMiddleware)
      .forRoutes(
        { path: 'v1/daily-training', method: RequestMethod.ALL },
        { path: 'v1/daily-training/training-of-the-day', method: RequestMethod.GET }
      );
  }
}
