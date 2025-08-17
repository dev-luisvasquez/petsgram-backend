import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePost } from './dto/posts.dto';


@Controller('posts')
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
