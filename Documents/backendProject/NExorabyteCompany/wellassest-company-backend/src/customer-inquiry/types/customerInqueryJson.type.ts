import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CustomerInqueryJsonType {
  @Field()
  heroTitle: string;

  @Field()
  background: string;
}
