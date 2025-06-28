import { InputType, Field, ObjectType, ID } from '@nestjs/graphql';

@ObjectType()
export class JobListingType {
  @Field(() => ID)
  id: string;
  
  @Field()
  title: string;

  @Field()
  location: string;

  @Field()
  status: string;

  @Field(() => [String])
  jobResponsibilities: string[];

  @Field(() => [String])
  educationalRequirements: string[];

  @Field(() => [String])
  experienceRequirements: string[];

  @Field(() => [String])
  additionalRequirements: string[];

  @Field(() => [String])
  jobPreferences: string[];

  @Field(() => [String])
  benefits: string[];

  @Field()
  applyBefore: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
