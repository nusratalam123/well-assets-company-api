// src/contact-info/dto/update-keep-in-touch.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateKeepInTouchInput {
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
