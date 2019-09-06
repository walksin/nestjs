import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostDto } from './post.dto';
import { User } from '../user/user.entity';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private readonly postRepository: Repository<Post>
    ) { }

    async store(data: PostDto, user: User) {
        const entity = await this.postRepository.create(data);
        await this.postRepository.save({
            ...entity,
            user
        });
        return entity;
    }

    async index() {
        const entities = await this.postRepository.find({
            relations: ['user']
        });
        return entities;
    }

    async show(id: string) {
        const entity = await this.postRepository.findOne(id);
        return entity;
    }

    async update(id: string, data: Partial<PostDto>) {
        const result = await this.postRepository.update(id, data)
    }

    async destroy(id: string) {
        const result = await this.postRepository.delete(id)
    }

    async vote(id: number, user: User) {
        const entity = await this.postRepository.findOne(id);
        if (!entity) {
            throw new BadRequestException('post is not existed');
        }

        await this.postRepository.createQueryBuilder()
            .relation(User, 'votes')
            .of(user)
            .add(id);
    }

    async unvote(id: number, user: User) {
        const entity = await this.postRepository.findOne(id);
        if (!entity) {
            throw new BadRequestException('post is not existed');
        }

        await this.postRepository.createQueryBuilder()
            .relation(User, 'votes')
            .of(user)
            .remove({id});
    }
}
