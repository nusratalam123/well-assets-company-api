import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AboutHeroType {
  @Field()
  title: string;

  @Field()
  backgroundImage: string;
}

@ObjectType()
export class LegacySectionType {
  @Field()
  title: string;

  @Field(() => [String])
  paragraphs: string[];

  @Field()
  image: string;
}

@ObjectType()
export class MilestoneItemType {
  @Field(() => Int,{ nullable: true }) 
  id?: number;
  
  @Field()
  value: string;

  @Field()
  label: string;
}

@ObjectType()
export class MilestoneSectionType {
  @Field({ nullable: true })
  title?: string;

  @Field(() => [MilestoneItemType])
  items: MilestoneItemType[];
}

@ObjectType()
export class MissionSectionType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image: string;
}

@ObjectType()
export class VisionSectionType {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image: string;
}

@ObjectType()
export class CSRImageType {
  @Field(() => Int)
  id: number;

  @Field()
  src: string;

  @Field()
  name: string;

  @Field()
  url: string;
}


@ObjectType()
export class ExcellenceItemType {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  icon: string;
}

@ObjectType()
export class CompanyType {
  @Field(() => Int,{ nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field()
  logo: string;

  @Field()
  description: string;

  @Field()
  phone: string;

  @Field()
  website: string;
}
