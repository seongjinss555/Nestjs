import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard, AuthenticatedGuard, LoginGuard } from './auth.guard';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {} //AuthService를 주입받음

  @Post('register') //register 주소로 POST로 온 요청 처리
  //class-validator로 자동으로 유효성 검증
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
    //authService를 사용해 user 정보 저장
  }

  @Post('login')
  async login(@Request() req, @Response() res) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    ); // validateUser를 호출해 유저 정보 획득

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false, //브라우저에서 읽을 수 있도록 함
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7days 단위는 밀리초
      });
    } //유저 정보가 있다면, 쿠키 정보를 response에 저장
    return res.send({ message: 'login success' });
  }

  @UseGuards(LoginGuard) //loginguard 사용
  @Post('login2')
  async login2(@Request() req, @Response() res) {
    //쿠키 정보는 없지만 request에 user 정보가 있다면 응답값에 쿠키 정보 추가
    if (!req.cookies['login'] && res.user) {
      //응답에 쿠키 정보 추가
      res.cookie('login', JSON.stringify(req.user), {
        httpOnly: true,
        maxAge: 1000 * 10,
      });
    } else {
      console.log('No user information found or cookie already exists.');
    }
    return res.send({ message: 'login2 success' });
  }

  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    return '로그인된 때만 이 글이 보입니다.';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login3')
  login3(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test-guard2')
  testGuardWithSession(@Request() req) {
    return req.user;
  }
}
