import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyTrainingDto } from './create-daily-training.dto';

export class UpdateDailyTrainingDto extends PartialType(CreateDailyTrainingDto) {

}