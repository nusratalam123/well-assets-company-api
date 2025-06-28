// src/dto/award-info.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class AwardInfoInput {
  @Field()
  title: string;

  @Field()
  backgroundImage: string;
}

@InputType()
export class AwardImageInput {
  @Field(() => Int,{ nullable: true })
  id: number;

  @Field()
  src: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
