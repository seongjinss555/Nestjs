import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
@Module({
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
  imports: [UserModule, PassportModule.register({ session: true })],
})
export class AuthModule {}
