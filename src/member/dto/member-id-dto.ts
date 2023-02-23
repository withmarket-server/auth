import { IsString } from 'class-validator';

export class MemberIdDto {
  @IsString()
  id: string;
}
  
  