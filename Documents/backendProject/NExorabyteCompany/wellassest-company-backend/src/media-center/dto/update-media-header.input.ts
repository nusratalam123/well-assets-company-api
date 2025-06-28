import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateMediaHeaderInput {
  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  backgroundImage: string;
}
