import { IsNumberString, IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindMemberDto {
  @IsNumberString()
  id?: string;

  @IsString()
  memberId?: string;

  @IsEmail()
  email?: string;
}