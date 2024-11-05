import { Injectable } from '@nestjs/common';
import { CreateMetricDto } from './dto/create-metric.dto';
import { UpdateMetricDto } from './dto/update-metric.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Metric } from './entities/metric.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MetricsService {
  
    constructor(
      @InjectRepository(Metric)
      private readonly metricRepository: Repository<Metric>,
     ) { }
  
  create(createMetricDto: CreateMetricDto){

    const metric = this.metricRepository.create(createMetricDto);

    return this.metricRepository.save(metric);
  }


  findAll() {
    return this.metricRepository.find();
  }

  findOne(id: number) {
    return this.metricRepository.findOneBy({id});
  }

  update(id: number, updateMetricDto: UpdateMetricDto) {
    return `This action updates a #${id} metric`;
  }

  remove(id: number) {
    return `This action removes a #${id} metric`;
  }
}
