import { IsEnum, IsNumber, IsString } from "class-validator";
import { MuscleGroup, RestTime } from "../exercises.enum";

export class CreateExerciseDto {

    @IsString()
    name: string;

    @IsEnum(MuscleGroup)
    muscle_group: MuscleGroup;

    @IsNumber()
    series?: number;
    
    @IsNumber()
    repetitions?: number;

    @IsNumber()
    exercise_weight?: number;

    @IsEnum(RestTime)
    rest_time?: RestTime;

    @IsString()
    observation?: string;

    @IsNumber()
    created_by?: number;
}
