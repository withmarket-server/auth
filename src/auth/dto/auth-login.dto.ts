import { IsString, IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthLoginDto {

    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/, {
        message: '비밀번호는 최소 1개 이상의 특수문자와 숫자를 포함해야 합니다',
    })
    @Transform(({ value }) => value.trim()) // Trim whitespace
    password: string;
}
