import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { DemoService } from './providers/demo/demo.service';

@Module({
  providers: [DemoService],
  controllers:[PostsController],
})
export class PostsModule {}
