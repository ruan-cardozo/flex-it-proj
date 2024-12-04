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
  ) {}

  create(createMetricDto: CreateMetricDto) {

    const parseDate = new Date(createMetricDto.data);

    const metric = this.metricRepository.create(createMetricDto);
    metric.imc = this.calculateImc(metric.peso, metric.altura);
    return this.metricRepository.save(metric);
  }

  findAll() {
    return this.metricRepository.find();
  }

  findOne(id: number) {
    return this.metricRepository.findOneBy({ id });
  }

  update(id: number, updateMetricDto: UpdateMetricDto) {
    return this.metricRepository.update(id, updateMetricDto);
  }

  remove(id: number) {
    return this.metricRepository.delete(id);
  }

  private calculateImc(peso: number, altura: number): number {
    return peso / ((altura / 100) ** 2);
  }
}