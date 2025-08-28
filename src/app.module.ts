import { Module } from '@nestjs/common';

// Module Posts
import { PostsModule } from './posts/posts.module';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';

// Module Owners
import { OwnersController } from './owners/owners.controller';
import { OwnersService } from './owners/owners.service';
import { OwnersModule } from './owners/owners.module';

// Module Likes
import { LikesModule } from './likes/likes.module';

import { PrismaModule } from './prisma/prisma.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    PrismaModule, 
    PostsModule, LikesModule, OwnersModule,
   
  ],
  controllers: [PostsController, OwnersController],
  providers: [OwnersService, PostsService],
})
export class AppModule {}
