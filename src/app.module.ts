import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: ['local.env', 'dev.env', 'prod.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DATABASE'),
        synchronize: configService.get('SYNC') === 'true',
        logging: configService.get('LOG') === 'true',
        entities: [join(__dirname + '/**/entities/*.entity.{js,ts}')],
        extra: {
          connectionLimit: 10, // Connection Pool에 생성할 최대 Connection 개수
          acquireTimeout: 2000, // Connection Pool에서 Connection을 얻는데 최대 대기할 시간(ms)
        }
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
