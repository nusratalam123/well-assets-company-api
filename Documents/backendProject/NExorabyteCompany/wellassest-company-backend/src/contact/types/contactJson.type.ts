import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class TitleImage {
  @Field()
  alt: string;

  @Field()
  title: string;

  @Field()
  url: string;
}

@ObjectType()
export class KeepInTouch {
  @Field()
  heading: string;

  @Field()
  address1: string;

  @Field()
  address2: string;

  @Field()
  email: string;

  @Field()
  salesEnquiry: string;

  @Field()
  jointVentureDevelopment: string;

  @Field()
  generalEnquiry: string;

  @Field()
  internationalCaller: string;

  @Field()
  whatsapp: string;

  @Field()
  mapLocation: string;
}

@ObjectType()
export class ContactJsonType {
  @Field(() => TitleImage)
  titleImage: TitleImage;

  @Field(() => KeepInTouch)
  keepInTouch: KeepInTouch;
}
