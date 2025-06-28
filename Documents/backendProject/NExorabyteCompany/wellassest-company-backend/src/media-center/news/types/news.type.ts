import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class NewsType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  slug: string;
  
  @Field()
  category: string;

  @Field()
  date: string;

  @Field()
  thumbnail: string;

  @Field(() => [String])
  description: string[];

  @Field(() => [String], { nullable: true })
  gallery?: string[];
}
