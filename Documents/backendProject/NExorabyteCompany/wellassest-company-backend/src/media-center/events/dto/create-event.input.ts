import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEventInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  slug?: string;

  @Field()
  category: string;

  @Field()
  date: string;

  @Field()
  thumbnail: string;

  @Field(() => [String])
  description: string[];
}
