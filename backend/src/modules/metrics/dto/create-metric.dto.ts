import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateMetricDto {
    @IsDecimal()
    @IsNotEmpty()
    peso: number;

    @IsDecimal()
    @IsNotEmpty()
    altura: number;
}
