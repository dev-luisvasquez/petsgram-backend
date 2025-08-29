import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { SupabaseAuthMiddleware } from './middleware/supabase-auth.middleware';

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
import { PetsController } from './pets/pets.controller';
import { PetsService } from './pets/pets.service';
import { PetsModule } from './pets/pets.module';
import * as dotenv from 'dotenv';
import { AuthModule } from './auth/auth.module';
dotenv.config();

@Module({
  imports: [
    PrismaModule, 
    PostsModule, LikesModule, OwnersModule, PetsModule, AuthModule,
  ],
  controllers: [PostsController, OwnersController, PetsController],
  providers: [OwnersService, PostsService, PetsService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SupabaseAuthMiddleware)
      .exclude(
        { path: 'owners/sign-in', method: RequestMethod.POST },
        { path: 'owners/sign-up', method: RequestMethod.POST }
      )
      .forRoutes('*');
  }
}
