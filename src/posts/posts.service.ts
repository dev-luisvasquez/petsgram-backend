import { Injectable } from '@nestjs/common';
import { CreatePost } from './dto/posts.dto';
import { PrismaService } from '../prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(data: CreatePost) {
    const createdPost = await this.prisma.posts.create({
        data: {
            id: uuidv4(),
            ...data
        }
    });
    return createdPost;
  }
}
