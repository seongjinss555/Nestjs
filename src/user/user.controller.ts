import {
  Controller,
  Body,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {} // 유저 서비스 주입

  @Post('/create')
  createUser(@Body() user: CreateUserDto) {
    return this.userService.createUser(user);
  } // 유저 생성

  @Get('/getUser/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    console.log(user);
    return user;
  } // 한 명의 유저 찾기

  @Put('/update/:email')
  updateUser(@Param('email') email: string, @Body() user: UpdateUserDto) {
    console.log(user);
    return this.userService.updateUser(email, user);
  } //유저 정보 업데이트

  @Delete('/delete/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  } //유저 삭제
}
