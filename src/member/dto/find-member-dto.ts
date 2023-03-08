import { IsNumberString, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindMemberDto {
  @IsNumberString()
  id?: string;

  @IsString()
  memberId?: string;

  @IsString()
  name?: string;

  @IsEmail()
  email?: string;
}