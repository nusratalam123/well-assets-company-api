import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ConnectType {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  message?: string;

  @Field()
  createdAt: Date;
}
