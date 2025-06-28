import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class BlogSectionType {
  @Field()
  image: string;

  @Field(() => [String], { nullable: true })
   texts?: string[];
}

@ObjectType()
export class BlogType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  category: string;

  @Field()
  date: string;

  @Field()
  thumbnail: string;

  @Field()
  shortDescription: string;

  @Field(() => [BlogSectionType])
  sections: BlogSectionType[];
}
