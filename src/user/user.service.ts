import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; //레포 주입 데코레이터
import { User } from './user.entity';
import { Repository } from 'typeorm'; //레포 임포트

@Injectable() //의존성 주입
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {} // 레포 주입

  createUser(user): Promise<User> {
    return this.userRepository.save(user);
  } // 유저 생성

  async getUser(email: String) {
    const result = await this.userRepository.findOne({
      where: { email },
    });
    return result;
  } // 한 명의 유저 찾기

  async updateUser(email, _user) {
    const user: User = await this.getUser(email);
    console.log(_user);
    user.username = _user.username;
    user.password = _user.password;
    console.log(user);
    this.userRepository.save(user);
  } // 유저 정보 업데이트, username과 password만 변경

  deleteUser(email: any) {
    return this.userRepository.delete({ email });
  } // 유저 정보 삭제

  async findByEmailOrSave(email, username, providerId): Promise<User> {
    const foundUser = await this.getUser(email); // 이메일로 유저를 찾음
    if (foundUser) {
      return foundUser;
    } // 찾았으면 유저 정보 반환

    const newUser = await this.userRepository.save({
      email,
      username,
      providerId,
    });
    return newUser;
  } // 유저 정보 없으면 저장 후 유저 정보 반환
}
