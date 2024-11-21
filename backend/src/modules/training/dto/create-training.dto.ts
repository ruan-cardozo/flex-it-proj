import { IsArray, IsDateString, IsEnum, IsNumber, IsString } from "class-validator";
import { TrainingObjective, WeeklyFrequency } from "../training.enum";

export class CreateTrainingDto {

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

    @IsNumber()
    created_by: number;
}
