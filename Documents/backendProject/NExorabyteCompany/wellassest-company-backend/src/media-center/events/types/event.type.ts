import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class EventType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  category: string;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  date: string;

  @Field()
  thumbnail: string;

  @Field(() => [String])
  description: string[];
}
