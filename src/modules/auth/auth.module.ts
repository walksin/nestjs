import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule,
    JwtModule.register({
      secretOrPrivateKey: 'qhtsdfsadfafsdfadfaddsadfasdfadadfadffa',
      signOptions: {
        expiresIn: '12h'
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
