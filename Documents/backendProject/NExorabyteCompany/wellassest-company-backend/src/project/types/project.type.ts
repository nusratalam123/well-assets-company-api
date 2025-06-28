import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

// DetailItemType for the project details section
@ObjectType()
export class DetailItemType {
  @Field() iconKey: string;
  @Field() label: string;
  @Field() value: string;
}

// RelatedProjectType for related projects section
@ObjectType()
export class RelatedProjectType {
  @Field() title: string;
  @Field() description: string;
  @Field() imageUrl: string;
  @Field() link: string;
}

// CoordinatesType for latitude and longitude of the project location
@ObjectType()
export class CoordinatesType {
  @Field(() => Float) lat: number;
  @Field(() => Float) lng: number;
}

// ProjectHeroType for the main project hero section (title, subtitle, background image)
@ObjectType()
export class ProjectHeroType {
  @Field() title: string;
  @Field() subtitle: string;
  @Field() backgroundImage: string;
}

// ProjectType for the main project details
@ObjectType()
export class ProjectType {
 @Field(() => Int,{nullable: true})
  id: number;
  
  @Field() name: string;
  @Field() slug: string;
  @Field() status: string;
  @Field() location: string;
  @Field() city: string;
  @Field() type: string;
  @Field() size: string;
  @Field() image: string;

  // Marking projectHero as nullable, as it may not always be available
  @Field(() => ProjectHeroType, { nullable: true })
  projectHero?: ProjectHeroType;

  @Field(() => [DetailItemType])
  detailItems: DetailItemType[];

  @Field(() => [String])
  features: string[];

  @Field(() => [String])
  amenities: string[];

  @Field(() => [String])
  images: string[];

  @Field(() => CoordinatesType)
  locationCoordinates: CoordinatesType;

  @Field(() => [RelatedProjectType])
  relatedProjects: RelatedProjectType[];
}
