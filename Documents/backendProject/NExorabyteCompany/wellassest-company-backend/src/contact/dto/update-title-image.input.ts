// src/contact-info/dto/update-title-image.input.ts
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateTitleImageInput {
    @Field()
    alt: string;

    @Field()
    title: string; 

    @Field()
    url: string;
 
}
