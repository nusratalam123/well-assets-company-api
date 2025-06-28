import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class LandownerHeaderType {
  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  backgroundImage: string;
}

@ObjectType()
export class EssenceItemType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  icon: string;

  @Field()
  description: string;  // New field for description

  @Field()
  src: string;  // New field for the image URL
}
