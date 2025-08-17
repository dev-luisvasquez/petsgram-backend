import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    PrismaModule, 
    PostsModule,
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb://localhost:27017/petsgram')
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
