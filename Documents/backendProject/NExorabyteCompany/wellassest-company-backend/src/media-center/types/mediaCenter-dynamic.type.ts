import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class MediaCenterDynamicType {
  @Field()
  slug: string;

  @Field()
  title: string;

  @Field()
  date: string;

  @Field()
  subtitle: string;

  @Field(() => [String])
  imageUrls: string[];

  @Field(() => [String])
  content: string[];
}
