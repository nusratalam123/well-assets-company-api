// src/types/award-info.type.ts
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AwardInfoType {
  @Field()
  title: string;

  @Field()
  backgroundImage: string;
}

@ObjectType()
export class AwardImageType {
  @Field(() => Int)
  id: number;

  @Field()
  src: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
