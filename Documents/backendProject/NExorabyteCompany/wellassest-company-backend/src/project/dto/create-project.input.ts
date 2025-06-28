import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CoordinatesInput {
  @Field() lat: number;
  @Field() lng: number;
}

@InputType()
export class RelatedProjectInput {
  @Field() title: string;
  @Field() description: string;
  @Field() imageUrl: string;
  @Field() link: string;
}

@InputType()
export class AddProjectInput {
  @Field() name: string;
  @Field() slug: string;
  @Field() status: string;
  @Field() location: string;
  @Field() city: string;
  @Field() type: string;
  @Field() size: string;
  @Field() image: string;

  @Field(() => [String])
  features: string[];

  @Field(() => [String])
  amenities: string[];

  @Field(() => [String])
  images: string[];

  @Field(() => CoordinatesInput)
  locationCoordinates: CoordinatesInput;

  @Field(() => [RelatedProjectInput])
  relatedProjects: RelatedProjectInput[];
}
