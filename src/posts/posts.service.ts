import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePost } from './dto/posts.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
    
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>
    ) {}

    async createPost(data: CreatePost): Promise<Post> {
        const createdPost = new this.postModel(data);
        console.log('Created Post:', createdPost);
        return createdPost.save();
    }

    async findAll(): Promise<Post[]> {
        return this.postModel.find().exec();
    }

    async findOne(id: string): Promise<Post | null> {
        return this.postModel.findById(id).exec();
    }

    async update(id: string, data: Partial<CreatePost>): Promise<Post | null> {
        return this.postModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async delete(id: string): Promise<Post | null> {
        return this.postModel.findByIdAndDelete(id).exec();
    }
}
