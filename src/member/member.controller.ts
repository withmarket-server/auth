import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MemberService } from './member.service';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { AuthGuard } from '@nestjs/passport';
// import { JwtAuthGuard } from '../auth/security/jwt-auth.guard';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('/:id')
  async findOne(@Param('id') id: string): Promise<Member> {
    return this.memberService.findOne(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.memberService.delete(id);
  }
}
