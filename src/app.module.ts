import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      //sqlite 설정 메서드
      type: 'sqlite', //데이터베이스 타입
      database: 'nest-auth-test.sqlite', // 데이터베이스 파일명
      entities: [User], // 엔티티 리스트
      synchronize: true, // 데이터베이스 스키마를 동기화
      logging: true,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
