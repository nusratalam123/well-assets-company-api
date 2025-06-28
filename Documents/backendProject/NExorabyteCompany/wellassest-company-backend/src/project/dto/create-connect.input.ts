import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateConnectInput {
  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  message?: string;
}
