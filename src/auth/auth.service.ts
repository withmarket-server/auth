import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MemberService } from '../member/member.service';
import { ConfigService } from '@nestjs/config';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Member } from '../member/entities/member.entity';
import { TokenPayload } from './interface/token-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateMember(authLoginDto: AuthLoginDto): Promise<Member> {
    let member: Member;

    if (authLoginDto.type === 'email') {
      member = await this.memberService.findOneByEmail(authLoginDto.email);
    } else {
      member = await this.memberService.findOneByUserId(authLoginDto.userId);
    }
     
    if (member && member.validatePassword(authLoginDto.password)) {
      return member;
    }
    return null;
  }

  async login(authLoginDto: AuthLoginDto): Promise<TokenPayload> {
    const member = await this.validateMember(authLoginDto);
    return this.generateJwtToken(member);
  }

  async register(createMemberDto: CreateMemberDto) {    
    const { hashedPassword, salt } = await this.memberService.setPassword(createMemberDto.password)
    createMemberDto.password = hashedPassword
    createMemberDto.salt = salt
    return this.memberService.create(createMemberDto)
  }

  async refresh(updateAuthDto: UpdateAuthDto): Promise<TokenPayload> {
    const decodedToken = this.jwtService.decode(updateAuthDto.refreshToken) as any;
    const user = await this.memberService.findOne(decodedToken.id);

    if (!user || user.refreshToken !== updateAuthDto.refreshToken) {
      throw new Error('Invalid refresh token');
    }

    return this.generateJwtToken(user)
  }

  async generateJwtToken(member: Member): Promise<TokenPayload>  {
    const payload = { id: member.id, memberId: member.memberId };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, { expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION') });
    await this.memberService.updateRefreshToken(member.id, refreshToken);

    const tokenPayload: TokenPayload = {
      accessToken: accessToken,
      refreshToken: refreshToken
    }

    return tokenPayload;
  }

  async generateRefreshToken(member: Member) {
    const payload = { id: member.id, memberId: member.memberId };
    const refreshToken = this.jwtService.sign(payload, { expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION') });
    await this.memberService.updateRefreshToken(member.id, refreshToken);
    return refreshToken
  }

  // 검증 실패시 JwtException 발생
  async verifyJwtToken(token: string) {
    return this.jwtService.verify(token);
  }

  async validateUserFromGoogle(profile: any): Promise<TokenPayload> {
    const { id, name, emails } = profile;
    
    const member = await this.memberService.findOneByEmail(emails[0].value);

    if (member) {
      return this.generateJwtToken(member);
    }

    const newMember = CreateMemberDto.MakeGoogleMember(id, emails[0].value, `${name.familyName}${name.givenName}`);
    const createdMember = await this.memberService.create(newMember);
    return this.generateJwtToken(createdMember);
  }
}