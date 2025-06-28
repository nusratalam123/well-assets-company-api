import { ObjectType, Field } from '@nestjs/graphql';
import { UserType } from '../types/user.type';

@ObjectType()
export class LoginResponseType {
  @Field()
  token: string;

  @Field(() => UserType)
  user: UserType;
}
