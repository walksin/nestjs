import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './module/posts/posts.module';
import { DemoMiddleware } from './core/middlewares/demo.middleware';
import { APP_GUARD } from '@nestjs/core';
import { DemoAuthGuard } from './core/guards/demo-auth.guard';
import { DemoRoleGuard } from './core/role/demo-role.guard';

@Module({
  imports: [PostsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass:DemoRoleGuard
    },
  ],
})
export class AppModule implements NestModule{
  configure(consumer: import("@nestjs/common").MiddlewareConsumer): void | import("@nestjs/common").MiddlewareConsumer {
    consumer.apply(DemoMiddleware)
    .forRoutes('posts');
  }
}
