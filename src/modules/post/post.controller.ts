import { Controller, Body, Post, Get, Param, Put, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { PostService } from './post.service';
import { async } from 'rxjs/internal/scheduler/async';
import { PostDto } from './post.dto';
import { AuthGuard } from '@nestjs/passport';
import { User as UserEntity } from '../user/user.entity';
import { User } from '../../core/decorators/user.decorator';


@Controller('posts')
export class PostController {
    constructor(
        private readonly postService: PostService
    ) { }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async store(@Body() data: PostDto, @User() user: UserEntity) {
        return await this.postService.store(data, user)
    }

    @Get()
    async index() {
        return await this.postService.index()
    }

    @Get(':id')
    async show(@Param('id') id: string) {
        return await this.postService.show(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Partial<PostDto>) {
        return await this.postService.update(id, body)
    }

    @Delete(':id')
    async destroy(@Param('id') id: string) {
        return await this.postService.destroy(id)
    }

    @Post(':id/vote')
    @UseGuards(AuthGuard('jwt'))
    async vote(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity) {
        return await this.postService.vote(id, user);
    }

    @Delete(':id/vote')
    @UseGuards(AuthGuard('jwt'))
    async unvote(@Param('id', ParseIntPipe) id: number, @User() user: UserEntity) {
        return await this.postService.unvote(id, user);
    }
}
