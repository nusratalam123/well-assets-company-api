import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class LandownerHeaderInput {
  @Field()
  title: string;

  @Field()
  subtitle: string;

  @Field()
  backgroundImage: string;
}

@InputType()
export class CreateEssenceItemInput {
  @Field()
  title: string;

  @Field()
  icon: string;

  @Field()
  description: string;
}

@InputType()
export class UpdateEssenceItemInput {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  icon: string;

  
  @Field()
  description: string;
}
