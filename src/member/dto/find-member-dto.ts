import { IsNumberString, IsString, IsEmail } from 'class-validator';

export class FindMemberDto {
  @IsNumberString()
  id: string;

  @IsString()
  memberId: string;

  @IsEmail()
  email: string;
}