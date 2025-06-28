import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNewsInput {
  @Field()
  title: string;

  @Field()
  date: string;

  @Field()
  category: string;

  @Field()
  thumbnail: string;

  @Field(() => [String])
  description: string[];

  @Field(() => [String], { nullable: true })
  gallery?: string[];
}
