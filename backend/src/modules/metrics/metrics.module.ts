import { Module } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { MetricsController } from './metrics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metric } from './entities/metric.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Metric])],
  controllers: [MetricsController],
  providers: [MetricsService],
})
export class MetricsModule {}
