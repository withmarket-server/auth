import { IsString, IsNumberString, IsEmail, IsNotEmpty, MinLength, Matches, IsPhoneNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMemberDto {

    @IsString()
    @IsNotEmpty()
    memberId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    provider: string;

    @IsString()
    providerId: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber('KR')
    phone: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d).+$/, {
        message: '비밀번호는 최소 1개 이상의 특수문자와 숫자를 포함해야 합니다',
    })
    @Transform(({ value }) => value.trim()) // Trim whitespace
    password: string;

    salt: string;
    
    static MakeGoogleMember(id: string, email: string, name: string): CreateMemberDto {
        const newMember = new CreateMemberDto();
        newMember.provider = 'google';
        newMember.providerId = id;
        newMember.email = email;
        newMember.name = name;
        return newMember;
    }
}
  
  
  
  