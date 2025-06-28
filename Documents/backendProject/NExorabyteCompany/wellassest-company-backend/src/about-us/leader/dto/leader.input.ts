// Step 2: Input Types (leader.input.ts)
import { InputType, Field, ID, Int } from '@nestjs/graphql';

@InputType()
export class LeaderHeroInput {
  @Field() title: string;
  @Field() backgroundImage: string;
}

@InputType()
export class FounderInput {
  @Field() name: string;
  @Field() title: string;
  @Field(() => [String]) description: string[];
  @Field() imageUrl: string;
}

@InputType()
export class TeamMemberInput {
  @Field(() => Int,{nullable: true})
  id: number;
  @Field({nullable: true}) name: string;
  @Field({nullable: true}) title: string;
  @Field({nullable: true}) imageUrl: string;
}

@InputType()
export class RecognitionInput {
  @Field(() => Int,{nullable: true}) id: number;
  @Field() src: string;
  @Field() name: string;
  @Field() description: string;
}
