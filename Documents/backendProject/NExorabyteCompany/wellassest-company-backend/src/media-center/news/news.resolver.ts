import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewsService } from './news.service';
import { NewsType } from './types/news.type';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';

@Resolver()
export class NewsResolver {
  constructor(private readonly newsService: NewsService) {}
  @Mutation(() => NewsType)
  createNews(@Args('input') input: CreateNewsInput) {
    return this.newsService.create(input);
  }

  @Query(() => [NewsType])
  getAllNews() {
    return this.newsService.findAll();
  }

  @Query(() => NewsType)
  getNews(@Args('id', { type: () => String }) id: string) {
    return this.newsService.findOne(id);
  }

  @Mutation(() => NewsType)
  updateNews(
    @Args('id', { type: () => String }) id: string,
    @Args('input') input: UpdateNewsInput,
  ) {
    return this.newsService.update(id, input);
  }

  @Mutation(() => Boolean)
  deleteNews(@Args('id', { type: () => String }) id: string) {
    return this.newsService.delete(id);
  }
}
