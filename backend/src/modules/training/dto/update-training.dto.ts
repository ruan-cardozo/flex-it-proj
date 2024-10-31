import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingDto } from './create-training.dto';
import { IsArray, IsDateString, IsEnum, IsString } from 'class-validator';
import { TrainingObjective, WeeklyFrequency } from '../training.enum';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
    @IsString()
    name: string;

    @IsEnum(TrainingObjective)
    training_objective: TrainingObjective;

    @IsDateString()
    start_date: Date;

    @IsDateString()
    end_date: Date;

    @IsEnum(WeeklyFrequency)
    weekly_frequency: WeeklyFrequency;

    @IsString()
    necessary_equipment: string;

    @IsArray()
    exercise_ids: number[];
}
