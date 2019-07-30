import { Controller,Get, Req, Query, Headers, Param, Body,Post } from '@nestjs/common';
import { CreatePostDto } from './post.dto';
import { DemoService } from './providers/demo/demo.service';

@Controller('posts')
export class PostsController {
    
    constructor(private readonly demoServices:DemoService){
    }

    @Get()
    index(){
        return this.demoServices.findAll();
    }
 
    @Get(':id')
    show(@Param() params){
        console.log(params)
        return {
            title:`Post ${params.id}`
        }
    }

    @Post()
    store(@Body() post:CreatePostDto){
        this.demoServices.create(post)
        console.log(post.title)
    }
    
}
