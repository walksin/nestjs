import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { from } from 'rxjs';
import { JwtStrategy } from './stategies/jwt.strategy'

@Module({
  imports: [UserModule,
    JwtModule.register({
      secretOrPrivateKey: 'qhtsdfsadfafsdfadfaddsadfasdfadadfadffa',
      signOptions: {
        expiresIn: '12h'
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule { }
