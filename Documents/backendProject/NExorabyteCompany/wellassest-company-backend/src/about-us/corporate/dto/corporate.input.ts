import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class AboutHeroInput {
  @Field() title: string;
  @Field() backgroundImage: string;
}

@InputType()
export class LegacySectionInput {
  @Field()
  title: string;

  @Field(() => [String])
  paragraphs: string[];

  @Field()
  image: string;
}

@InputType()
export class MilestoneItemInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  value?: string;

  @Field()
  label?: string;
}

@InputType()
export class MilestoneSectionInput {
  @Field({ nullable: true })
  title?: string;

  @Field(() => [MilestoneItemInput])
  items: MilestoneItemInput[];
}

@InputType()
export class MissionSectionInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image: string;
}

@InputType()
export class VisionSectionInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  image: string;
}

@InputType()
export class CSRImageInput {
  @Field()
  id: number;

  @Field()
  src: string;

  @Field()
  name: string;

  @Field()
  url: string;
}

// === INPUT DTOs ===
@InputType()
export class ExcellenceItemInput {
  @Field(() => Int,{ nullable: true })
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  icon: string;
}

@InputType()
export class CompanyInput {
  @Field(() => Int,{nullable: true})
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