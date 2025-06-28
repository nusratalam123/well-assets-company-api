import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { AccountStatus, Role } from '../../auth/schema/user.schema';

registerEnumType(AccountStatus, { name: 'AccountStatus' });
registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class UserType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field(() => AccountStatus)
  accountStatus: AccountStatus;

  @Field(() => Role)
  role: Role;
}
