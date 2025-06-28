import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { Blog } from './schema/blog.schema';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
      TypeOrmModule.forFeature([Blog]), 
    ],
  providers: [BlogResolver, BlogService],
})
export class BlogModule {}
