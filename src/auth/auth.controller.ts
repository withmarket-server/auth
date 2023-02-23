import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() createMemberDto: CreateMemberDto) {
    return this.authService.register(createMemberDto);
  }

  
  @Post('/login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Post('/refresh')
  async refresh(@Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.refresh(updateAuthDto);
  }

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle() {}

  @UseGuards(AuthGuard('google'))
  @Get('/google/callback')
  async googleCallback(@Req() req) {
    return req.user
  }
}
