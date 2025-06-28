// Step 1: Define GraphQL Types (leader.types.ts)
import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LeaderHeroType {
  @Field() title: string;
  @Field() backgroundImage: string;
}

@ObjectType()
export class FounderType {
  @Field() name: string;
  @Field() title: string;
  @Field(() => [String]) description: string[];
  @Field() imageUrl: string;
}

@ObjectType()
export class TeamMemberType {
  @Field(() => Int,{nullable: true})
  id: number;

  @Field() name: string;
  @Field() title: string;
  @Field() imageUrl: string;
}

@ObjectType()
export class RecognitionType {
  @Field(() => Int) id: number;
  @Field() src: string;
  @Field() name: string;
  @Field() description: string;
}

@ObjectType()
export class LeaderPageType {
  @Field(() => LeaderHeroType) leaderHero: LeaderHeroType;
  @Field(() => FounderType) founderSection: FounderType;
  @Field(() => [TeamMemberType]) leaderOfTeam: TeamMemberType[];
  @Field(() => [TeamMemberType]) managementTeam: TeamMemberType[];
  @Field(() => [RecognitionType]) recognitions: RecognitionType[];
}