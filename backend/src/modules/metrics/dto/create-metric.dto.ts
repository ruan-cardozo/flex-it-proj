import { IsDecimal, IsNotEmpty } from 'class-validator';

export class CreateMetricDto {
    @IsNotEmpty()
    data: Date;

    @IsDecimal()
    @IsNotEmpty()
    peso: number;

    @IsDecimal()
    @IsNotEmpty()
    altura: number;
}
