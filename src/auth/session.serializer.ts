import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  } //userserivce 주입

  //세션에 정보를 저장할 때 사용
  serializeUser(user: any, done: (error: Error, user: any) => void): any {
    done(null, user.email); // 세션에 저장할 정보
  }

  //세션에서 정보를 꺼내올 때 사용
  async deserializeUser(
    payload: any,
    done: (err: Error, payload: any) => void,
  ): Promise<any> {
    const user = await this.userService.getUser(payload);
    //유저 정보가 없는 경우 done()함수에 에러 전달
    if (!user) {
      done(new Error('No user'), null);
      return;
    }
    const { password, ...userInfo } = user;

    //유저 정보가 있다면 유저 정보 반환
    done(null, userInfo);
  }
}
