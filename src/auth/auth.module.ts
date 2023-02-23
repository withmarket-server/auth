import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
// import { JwtAuthGuard } from './security/jwt-auth.guard';
import { MemberModule } from '../member/member.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './security/passport.jwt.strategy';
import { GoogleAuthStrategy } from './security/google-auth.strategy'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '1800s' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    MemberModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleAuthStrategy],
})
export class AuthModule {}
