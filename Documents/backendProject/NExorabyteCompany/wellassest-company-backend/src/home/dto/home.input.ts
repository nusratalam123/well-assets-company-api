import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateHomeHeroInput {
  @Field({nullable: true}) title?: string;
  @Field({nullable: true}) backgroundImage?: string;
  @Field({nullable: true}) videoThumbnail?: string;
  @Field({nullable: true}) videoUrl?: string;
}

@InputType()
export class UpdateSliderInput {
  @Field({ nullable: true }) 
  id?: number;

  @Field({nullable: true})
  title: string;

  @Field({nullable: true})
  subtitle: string;

  @Field({nullable: true})
  image: string;
}

@InputType()
export class UpdateHomeExcellenceInput {
  @Field({ nullable: true })
  id?: number;

  @Field({nullable: true})
  title?: string;

  @Field({nullable: true})
  description?: string;

  @Field({nullable: true})
  icon?: string;
}
