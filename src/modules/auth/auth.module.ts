import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';

@Module({
  imports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
