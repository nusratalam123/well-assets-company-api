import { ObjectType, Field, Int} from '@nestjs/graphql';

@ObjectType()
export class HomeHeroType {
  @Field() title: string;
  @Field() backgroundImage: string;
  @Field() videoThumbnail: string;
  @Field() videoUrl: string;
}

@ObjectType()
export class HomeSliderType {
  @Field(() => Int) id: number;
  @Field() title: string;
  @Field() subtitle: string;
  @Field() image: string;
}
@ObjectType()
export class HomeExcellenceType {
  @Field(() => Int)  
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  icon: string;
}
