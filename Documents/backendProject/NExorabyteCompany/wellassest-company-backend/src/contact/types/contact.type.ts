import { ObjectType, Field, ID } from '@nestjs/graphql';
import { ContactReason } from '../schema/contact.schema';

@ObjectType()
export class ContactType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  message: string;

  @Field()  // Use the ContactReason enum here
  reasonForContacting:string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
