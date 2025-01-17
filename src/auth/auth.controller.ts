import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {} //AuthService를 주입받음

  @Post('register') //register 주소로 POST로 온 요청 처리
  //class-validator로 자동으로 유효성 검증
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
    //authService를 사용해 user 정보 저장
  }
}
