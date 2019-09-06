import { Controller, Body, Post, UseInterceptors, ClassSerializerInterceptor, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { async } from 'rxjs/internal/scheduler/async';
import { AuthGuard } from '@nestjs/passport';


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
    async authTest(){
        return {
            message:'ok'
        }
    }
}
