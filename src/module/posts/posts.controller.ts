import { Controller,Get, Req, Query, Headers, Param, Body,Post, HttpException, HttpStatus, ForbiddenException, UseFilters, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, SetMetadata, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';
import { DemoFilter } from '../../core/filters/demo.filter';
import { DemoAuthGuard } from '../../core/guards/demo-auth.guard';
import { Roles } from '../../core/decorators/roles.decorator';
import { LoggingInterceptor } from '../../core/inteceptors/logging.interceptor';
import { TransformInterceptor } from '../../core/interceptors/transform.interceptor';
import { ErrorInterceptor } from '../../core/interceptors/error.interceptor';
import { User } from '../../core/decorators/user.decorator';


@Controller('posts')
// @UseGuards(DemoAuthGuard)
// @UseInterceptors(ErrorInterceptor)
export class PostsController {
    
    constructor(private readonly demoServices:DemoService){
    }

    @Get()
    // @UseInterceptors(TransformInterceptor)
    @UseInterceptors(ErrorInterceptor)
    index(){
        throw new ForbiddenException()
        // return this.demoServices.findAll();
    }
 
    @Get(':id')
    show(@Param('id',ParseIntPipe) id){
        console.log(id,typeof id)
        return {
            title:`Post ${id}`
        }
    }

    @Post()
    // @UseFilters(DemoFilter)
    @UsePipes(ValidationPipe)
    // @SetMetadata('roles',['member'])
    @Roles('member')
    store(@Body() post:CreatePostDto,@User('demo') user){
        console.log(user)
        this.demoServices.create(post)
        console.log(post.title)
        // throw new HttpException('go away',HttpStatus.FORBIDDEN);
        // throw new ForbiddenException('go away');
    }
    
}
