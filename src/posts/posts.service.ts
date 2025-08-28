import { Injectable } from '@nestjs/common';
import { CreatePost } from './dto/posts.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: CreatePost) {
    const createdPost = await this.prisma.posts.create({
      data,
    });
    console.log('Created Post:', createdPost);
    return createdPost;
  }
}
