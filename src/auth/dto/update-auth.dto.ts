import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateAuthDto {
    @IsString()
    @IsNotEmpty()
    refreshToken: string;
}
