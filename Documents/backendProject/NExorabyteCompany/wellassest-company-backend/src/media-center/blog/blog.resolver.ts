import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { BlogType } from './types/blog.type';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';

@Resolver()
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}
  @Mutation(() => BlogType)
  createBlog(@Args('input') input: CreateBlogInput) {
    return this.blogService.create(input);
  }

  @Query(() => [BlogType])
  getAllBlogs() {
    return this.blogService.findAll();
  }

  @Query(() => BlogType)
  getBlog(@Args('id', { type: () => String }) id: string) {
    return this.blogService.findOne(id);
  }

  @Mutation(() => BlogType)
  updateBlog(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateBlogInput,
  ) {
    return this.blogService.update(id, input);
  }

  @Mutation(() => Boolean)
  deleteBlog(@Args('id', { type: () => String }) id: string) {
    return this.blogService.delete(id);
  }
}
