import { InputType, Field } from '@nestjs/graphql';
import { ContactReason } from '../schema/contact.schema';

@InputType()
export class CreateContactInput {
@Field({nullable: true })
  name?: string;

@Field({nullable: true })
  email: string;

  @Field({nullable: true })
  phone: string;

  @Field({nullable: true })
  message: string;

  @Field({nullable: true })
  reasonForContacting:string;

  @Field({ nullable: true })
  createdAt?: Date;

  @Field({ nullable: true })
  updatedAt?: Date;
}
