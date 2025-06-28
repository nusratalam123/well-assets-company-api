import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MediaHeaderType {
  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  backgroundImage: string;
}

@ObjectType()
export class MediaInfoType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  date: string;

  @Field()
  category: string;

  @Field()
  imgSrc: string;

  @Field()
  url: string;
}