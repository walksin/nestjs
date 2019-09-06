import { Controller, Body, Post, UseInterceptors, ClassSerializerInterceptor, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../../core/decorators/user.decorator';



@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService
    ) { }

    @Post('login')
    @UseInterceptors(ClassSerializerInterceptor)
    async login(@Body() data: LoginDto) {
        return await this.service.login(data);
    }

    @Get('test')
    @UseGuards (AuthGuard())
    async authTest(@User() user){
        console.log('user',user)
        return {
            message:'ok'
        }
    }
}
