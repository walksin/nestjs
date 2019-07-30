import { Injectable } from '@nestjs/common';
import { Post } from '../../interfaces/post.interface';

@Injectable()
export class DemoService {
    private readonly posts:Post[] = [];

    findAll() {
        return this.posts;
    }

    create(post:Post){
        this.posts.push(post);
        console.log(post)
    }
}
