import { Controller, Body, Post, Get, Param } from '@nestjs/common';
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
    async show(@Param('id') id :string){
        return await this.service.show(id);
    }
}