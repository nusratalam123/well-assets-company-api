import { ObjectType, Field } from '@nestjs/graphql';
import { BlogType } from '../blog/types/blog.type';
import { EventType } from '../events/types/event.type';
import { NewsType } from '../news/types/news.type';


@ObjectType()
export class MediaUnifiedType {
  @Field(() => [BlogType])
  blogs: BlogType[];

  @Field(() => [EventType])
  events: EventType[];

  @Field(() => [NewsType])
  news: NewsType[];
}
