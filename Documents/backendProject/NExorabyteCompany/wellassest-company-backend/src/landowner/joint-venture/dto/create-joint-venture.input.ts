import { InputType, Field } from '@nestjs/graphql';
import { Facing, LandCategory } from '../schema/joint-venture.schema';

@InputType()
export class CreateJointVentureInput {
  @Field()
  locality: string;

  @Field()
  address: string;

  @Field({ nullable: true })
  landSize?: string;

  @Field({ nullable: true })
  frontRoadWidth?: string;

  @Field(() => LandCategory, { nullable: true })
  landCategory?: LandCategory;

  @Field(() => Facing, { nullable: true })
  facing?: Facing;

  @Field({ nullable: true })
  benefits?: string;

  @Field()
  landownerName: string;

  @Field({ nullable: true })
  contactPerson?: string;

  @Field({ nullable: true })
  email?: string;

  @Field()
  phone: string;

  @Field({ nullable: true })
  message?: string;
}
