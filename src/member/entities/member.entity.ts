import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity()
export class Member {
  //@PrimaryGeneratedColumn('uuid')
  // id: string;

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, comment: '이름' })
  name: string;

  @Column({ nullable: true, comment: 'id' })
  memberId: string;

  @Column({ nullable: true, comment: '이메일', unique: true })
  email: string;

  @Column({ nullable: true, comment: '전화번호', unique: true })
  phone: string;

  @Column({ nullable: true, comment: 'oauth2.0 제공자'})
  provider: string;

  @Column({ nullable: true, comment: 'oauth2.0 id' })
  providerId: string;

  @Column({ nullable: true, comment: '비밀번호' })
  password: string;

  @Column({ nullable: true, comment: '비밀번호 salt' })
  salt: string;

  @Column({ nullable: true, comment: '리프레쉬 토큰' })
  refreshToken: string;
  
  @Column({ default: true, comment: '활성여부' })
  isActive: boolean;

  @CreateDateColumn({ comment: '생성일' })
  createdAt!: Date;

  @UpdateDateColumn({ comment: '수정일' })
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true, comment: '삭제일' })
  deletedAt?: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return hashedPassword === this.password;
  }
}