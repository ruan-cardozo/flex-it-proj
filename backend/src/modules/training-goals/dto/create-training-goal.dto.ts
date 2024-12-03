import { IsArray, IsBoolean, IsString } from "class-validator";

export class CreateTrainingGoalDto {

    @IsString()
    goal: string;

    @IsBoolean()
    done: boolean;

    created_by: number;
}

export class CreateManyGoalsDto {
    
    @IsString({ each: true })
    @IsArray()
    goals: { goal: string, done: boolean }[];
}