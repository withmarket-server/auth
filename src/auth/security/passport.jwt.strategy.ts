// JwtStrategy 예시
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { MemberService } from '../../member/member.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly memberService: MemberService, private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: configService.get<string>('IGNORE_EXPIRATION') === 'true',
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any) {
    const user = await this.memberService.findOneByUserId(payload.userId);
    if (!user) {
      throw new UnauthorizedException({ message: 'user does not exist' });
    }
    return user;
  }
}
