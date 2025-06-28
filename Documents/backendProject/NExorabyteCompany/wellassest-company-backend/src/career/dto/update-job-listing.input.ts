import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateJobListingInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  status?: string;

  @Field(() => [String], { nullable: true })
  jobResponsibilities?: string[];

  @Field(() => [String], { nullable: true })
  educationalRequirements?: string[];

  @Field(() => [String], { nullable: true })
  experienceRequirements?: string[];

  @Field(() => [String], { nullable: true })
  additionalRequirements?: string[];

  @Field(() => [String], { nullable: true })
  jobPreferences?: string[];

  @Field(() => [String], { nullable: true })
  benefits?: string[];

  @Field({ nullable: true })
  applyBefore?: string;
}
