import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    user_name: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}
