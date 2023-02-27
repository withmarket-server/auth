import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { plainToClass } from 'class-transformer';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async findOne(id: string): Promise<Member> {
    return this.memberRepository.findOneBy({id: +id});
  }

  async findMembersByPaging(currentPage: number, pageSize: number) {
    return this.memberRepository.find({
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
    })
  }

  // async findMembers(): Promise<Member[]> {
  //   return await this.memberRepository
  //   .createQueryBuilder('member') // 'member'라는 alias를 명시적으로 지정
  //   .select(["member.id", "member.name"])
  //   .where("member.id = :id", { id: 1 })
  //   .orderBy("member.name", "ASC")
  //   .getMany();
  // }

  async findMembers(): Promise<Member> {
    return this.memberRepository.findOneBy({id: 1});
  }

  async findOneByProviderId(providerId: string): Promise<Member> {
    return this.memberRepository.findOne({ where: { providerId } });
  }

  async findOneByEmail(email: string): Promise<Member> {
    return this.memberRepository.findOne({ where: { email } });
  }

  async findOneByUserId(memberId: string): Promise<Member> {
    return this.memberRepository.findOne({ where: { memberId } });
  }

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberRepository.save(plainToClass(Member, createMemberDto));
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    await this.memberRepository.update(id, plainToClass(Member, updateMemberDto));
    return this.memberRepository.findOneBy({id: +id});
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    return await this.memberRepository
    .createQueryBuilder('member') // 'member'라는 alias를 명시적으로 지정
    .update(Member)
    .set({ refreshToken: refreshToken })
    .where('id = :id', { id: id })
    .execute();
  }

  async delete(id: string): Promise<void> {
    await this.memberRepository.softDelete(id);
  }

  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    return {
      hashedPassword: hashedPassword,
      salt : salt
    }
  }
}
