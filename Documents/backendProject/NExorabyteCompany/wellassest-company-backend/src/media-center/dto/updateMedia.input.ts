import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class UpdateMediaInfoInput {
  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  date?: string;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => String, { nullable: true })
  imgSrc?: string;

  @Field(() => String, { nullable: true })
  url?: string;
}
