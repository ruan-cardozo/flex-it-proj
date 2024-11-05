import { PartialType } from '@nestjs/mapped-types';
import { CreateMetricDto } from './create-metric.dto';

export class UpdateMetricDto extends PartialType(CreateMetricDto) {}
