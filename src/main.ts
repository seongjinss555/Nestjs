import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 전역 파이프에 validationPipe추가
  app.use(cookieParser());
  app.use(
    session({
      secret: 'very-import-secret', // 세션 암호화에 사용되는 키
      resave: false, // 세션을 항상 저장할지 여부
      saveUninitialized: false, // 세션이 저장되기 전에는 초기화 되지 않은 상태로 세션을 미리 만들어 저장
      cookie: { maxAge: 3600000 }, //쿠키 유효시간 1시간
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
