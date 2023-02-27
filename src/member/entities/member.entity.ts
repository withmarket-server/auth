import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Entity()
export class Member {
  //@PrimaryGeneratedColumn('uuid')
  // id: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, comment: '이름' })
  name: string;

  @Column({ nullable: true, comment: '아이디', unique: true })
  memberId: string;

  @Column({ nullable: true, comment: '이메일', unique: true })
  email: string;

  @Column({ nullable: true, comment: '전화번호', unique: true })
  phone: string;

  @Exclude()
  @Column({ nullable: true, comment: 'oauth2.0 제공자'})
  provider: string;

  @Exclude()
  @Column({ nullable: true, comment: 'oauth2.0 id' })
  providerId: string;

  @Exclude()
  @Column({ nullable: true, comment: '비밀번호' })
  password: string;

  @Exclude()
  @Column({ nullable: true, comment: '비밀번호 salt' })
  salt: string;

  @Exclude()
  @Column({ nullable: true, comment: '리프레쉬 토큰' })
  refreshToken: string;
  
  @Exclude()
  @Column({ default: true, comment: '활성여부' })
  isActive: boolean;

  @Exclude()
  @CreateDateColumn({ comment: '생성일' })
  createdAt!: Date;

  @Exclude()
  @UpdateDateColumn({ comment: '수정일' })
  updatedAt!: Date;

  @Exclude()
  @DeleteDateColumn({ nullable: true, comment: '삭제일' })
  deletedAt?: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return hashedPassword === this.password;
  }
}