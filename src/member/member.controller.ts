import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { FindMemberDto } from './dto/find-member-dto';
import { AuthGuard } from '@nestjs/passport';
// import { JwtAuthGuard } from '../auth/security/jwt-auth.guard';

@Controller('member')
@UseGuards(AuthGuard('jwt'))
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // ([0-9]+) -> @IsNumberString()
  @Get('/:id([0-9]+)')
  async findOne(@Param('id') id: string): Promise<Member> {
    return this.memberService.findOne(id);
  }

  @Patch('/:id([0-9]+)')
  async update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete('/:id([0-9]+)')
  async delete(@Param('id') id: string): Promise<void> {
    return this.memberService.delete(id);
  }
}
