import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingGoalDto } from './create-training-goal.dto';

export class UpdateTrainingGoalDto extends PartialType(CreateTrainingGoalDto) {}
