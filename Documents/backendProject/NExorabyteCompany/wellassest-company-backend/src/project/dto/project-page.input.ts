import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class ProjectFilterInput {
    @Field({ nullable: true })
    location?: string;
  
    @Field({ nullable: true })
    status?: string;
  
    @Field({ nullable: true })
    type?: string;
  
    @Field({ nullable: true })
    size?: string;
}

@InputType()
export class DetailItemInput {
  @Field() iconKey: string;
  @Field() label: string;
  @Field() value: string;
}

@InputType()
export class RelatedProjectInput {
  @Field() title: string;
  @Field() description: string;
  @Field() imageUrl: string;
  @Field() link: string;
}

@InputType()
export class CoordinatesInput {
  @Field(() => Float) lat: number;
  @Field(() => Float) lng: number;
}

@InputType()
export class UpdateProjectInput {
  @Field(() => Int) id: number;

  @Field({ nullable: true }) name?: string;
  @Field({ nullable: true }) slug?: string;
  @Field({ nullable: true }) status?: string;
  @Field({ nullable: true }) location?: string;
  @Field({ nullable: true }) city?: string;
  @Field({ nullable: true }) type?: string;
  @Field({ nullable: true }) size?: string;
  @Field({ nullable: true }) image?: string;

  @Field(() => [DetailItemInput], { nullable: true }) detailItems?: DetailItemInput[];
  @Field(() => [String], { nullable: true }) features?: string[];
  @Field(() => [String], { nullable: true }) amenities?: string[];
  @Field(() => [String], { nullable: true }) images?: string[];
  @Field(() => CoordinatesInput, { nullable: true }) locationCoordinates?: CoordinatesInput;
  @Field(() => [RelatedProjectInput], { nullable: true }) relatedProjects?: RelatedProjectInput[];
}
