import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class CreateMediaInfoInput {
  @Field()
  title: string;

  @Field()
  date: string;

  @Field()
  category: string;

  @Field()
  imgSrc: string;

  @Field()
  url: string;
}
