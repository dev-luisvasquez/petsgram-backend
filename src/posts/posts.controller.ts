import { Controller, Get, Post } from '@nestjs/common';

@Controller('posts')
export class PostsController {

    @Get('/')
    findAll() {
        return [{ id: 1, title: 'Primer Post' }];
    }

    @Post('/')
    create() {
        return { message: 'Post creado' };
    }
}
