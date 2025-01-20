import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  //생성자에서 UserService를 주입받음
  constructor(private userService: UserService) {}

  async register(userDto: CreateUserDto) {
    //이미 가입된 유저가 있는지 체크
    const user = await this.userService.getUser(userDto.email);
    if (user) {
      throw new HttpException(
        '이미 가입된 유저입니다.',
        HttpStatus.BAD_REQUEST,
      );
    } // 이미 가입된 유저가 있으면 에러 발생

    //패스워드 암호화
    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);
    console.log(encryptedPassword);
    //데이터베이스에 저장. 저장 중 에러가 나면 서버 에러 발생
    try {
      const user = await this.userService.createUser({
        ...userDto,
        password: encryptedPassword,
      });

      //회원 가입 후 반환하는 값에는 password를 주지 않음
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException('서버 에러', 500);
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUser(email); // email로 유저 얻어옴

    if (!user) {
      return null;
    }

    const { password: hashedPassword, ...userInfo } = user;
    //패스워드를 따로 뽑아냄
    if (bcrypt.compareSync(password, hashedPassword)) {
      return userInfo;
    } //패스워드가 일치하면 성공
    return null;
  }
}
