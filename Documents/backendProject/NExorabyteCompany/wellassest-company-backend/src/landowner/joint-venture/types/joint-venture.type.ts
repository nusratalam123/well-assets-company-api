import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Facing, LandCategory } from '../schema/joint-venture.schema';

@ObjectType()
export class JointVentureType {
  @Field(() => String)
  id: string;

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
