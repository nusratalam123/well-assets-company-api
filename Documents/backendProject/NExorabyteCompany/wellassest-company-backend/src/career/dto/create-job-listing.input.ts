import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateJobListingInput {
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
