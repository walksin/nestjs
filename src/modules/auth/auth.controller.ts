import { Controller, Body, Post, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';


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
}
