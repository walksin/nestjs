import { Controller, Body, Post, Get, Param, UseInterceptors, ClassSerializerInterceptor, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { async } from 'rxjs/internal/scheduler/async';
import { UserDto, UpdatePasswordDto } from './user.dto';

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

    @Put(':id/password')
    @UseInterceptors(ClassSerializerInterceptor)
    async updatePassword(@Param('id') id: string, @Body() data: UpdatePasswordDto) {
        return await this.service.updatePassword(id, data);
    }
}