import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

const CommentSchema = SchemaFactory.createForClass(Comment);

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'Pet', required: true })
  petId: Types.ObjectId;

  @Prop({ required: true })
  ownerId: string;

  @Prop({ required: true })
  mediaUrl: string;

  @Prop()
  caption: string;

  @Prop({ type: [String], default: [] })
  likes: string[];

  @Prop({ type: [CommentSchema], default: [] })
  comments: Comment[];

  @Prop({ default: false })
  isHidden: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
