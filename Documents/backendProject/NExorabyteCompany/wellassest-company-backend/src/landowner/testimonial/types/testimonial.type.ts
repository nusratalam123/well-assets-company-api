import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class TestimonialType {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  quote: string;

  @Field()
  authorName: string;

  @Field()
  authorPosition: string;

  @Field()
  videoUrl: string;

  @Field()
  thumbnailUrl: string;
}
