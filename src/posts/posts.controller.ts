import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePost } from './dto/posts.dto';
import { SupabaseAuthMiddleware } from '../middleware/supabase-auth.middleware';


@Controller('posts')
@UseGuards(SupabaseAuthMiddleware)
export class PostsController {

    constructor(private readonly postsService: PostsService) {}

    @Get('/')
    findAll() {
        return "posts";
    }

    @Post('/')
    create(@Body() createPostDto: CreatePost) {
        return this.postsService.createPost(createPostDto);
    }
    
    
}
