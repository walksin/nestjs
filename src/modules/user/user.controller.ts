import { Controller, Body, Post, Get, Param, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UserService } from './user.service';
import { async } from 'rxjs/internal/scheduler/async';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
    constructor(
        private readonly service: UserService
    ) { }

    @Post()
    async store(@Body() data: UserDto) {
        return await this.service.store(data);
    }

    @Get(':id')
    @UseInterceptors(ClassSerializerInterceptor)
    async show(@Param('id') id: string) {
        return await this.service.show(id);
    }
}