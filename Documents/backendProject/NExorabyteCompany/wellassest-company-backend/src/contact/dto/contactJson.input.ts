import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateTitleImageInput {
  @Field()
  alt: string;

  @Field()
  title: string;

  @Field()
  url: string;
}

@InputType()
export class UpdateKeepInTouchInput {
  @Field({ nullable: true })  // Optional field, can be null
  heading: string;

  @Field({ nullable: true })
  address1: string;

  @Field({ nullable: true })
  address2: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  salesEnquiry: string;

  @Field({ nullable: true })
  jointVentureDevelopment: string;

  @Field({ nullable: true })
  generalEnquiry: string;

  @Field({ nullable: true })
  internationalCaller: string;

  @Field({ nullable: true })
  whatsapp: string;

  @Field({ nullable: true })
  mapLocation: string;
}