import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LeaderService } from './leader.service';
import { FounderType, LeaderHeroType, LeaderPageType, RecognitionType, TeamMemberType } from './types/leader.type';
import { FounderInput, LeaderHeroInput, RecognitionInput, TeamMemberInput } from './dto/leader.input';

@Resolver()
export class LeaderResolver {
  constructor(private readonly leaderService: LeaderService) {}
  @Query(() => LeaderPageType)
  getLeaderPage() {
    return this.leaderService.getLeaderPage();
  }
  
  @Query(() => LeaderHeroType)
  getLeaderHero() {
    return this.leaderService.getLeaderHero();
  }
  @Mutation(() => LeaderHeroType)
  updateLeaderHero(@Args('input') input: LeaderHeroInput) {
    return this.leaderService.updateLeaderHero(input);
  }


  @Query(() => FounderType)
  getFounderInfo() {
    return this.leaderService.getFounderInfo();
  }
  @Mutation(() => FounderType)
  updateFounderSection(@Args('input') input: FounderInput) {
    return this.leaderService.updateFounderSection(input);
  }
  @Query(() => [TeamMemberType])
  getLeaderTeam() {
    return this.leaderService.getLeaderTeam();
  }

 // Mutation to update leader by ID
 @Mutation(() => TeamMemberType, { nullable: true })
 updateLeaderOfTeam(
   @Args('id', { type: () => Int }) id: number,
   @Args('input', { type: () => TeamMemberInput }) input: TeamMemberInput
 ) {
   return this.leaderService.updateLeaderOfTeam(id, input);
 }

  // Mutation to add a new leader to the team
  @Mutation(() => TeamMemberType)
  addLeaderToTeam(
    @Args('input', { type: () => TeamMemberInput }) input: TeamMemberInput
  ) {
    return this.leaderService.addLeaderToTeam(input);
  }

  // Mutation to delete a leader by ID
  @Mutation(() => Boolean)
  deleteLeaderFromTeam(
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.leaderService.deleteLeaderFromTeam(id);
  }
  //menagement section
  // Query to get the management team
  @Query(() => [TeamMemberType])
  getManagementTeam() {
    return this.leaderService.getManagementTeam();
  }
 
  @Mutation(() => TeamMemberType)
  async updateManagementTeam(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => TeamMemberInput }) input: TeamMemberInput
  ) {
    try {
      const updatedMember = await this.leaderService.updateManagementTeam(id, input);
      return updatedMember;  // Ensure we return a non-null response
    } catch (error) {
      throw new Error(`Error updating management team member: ${error.message}`);
    }
  }
  // Mutation to add a new team member with auto-incremented id
  @Mutation(() => TeamMemberType)
  addManagementTeam(
    @Args('input', { type: () => TeamMemberInput }) input: TeamMemberInput
  ) {
    return this.leaderService.addManagementTeam(input);
  }

  // Mutation to delete a team member by id
  @Mutation(() => Boolean)
  deleteManagementTeam(
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.leaderService.deleteManagementTeam(id);
  }


  @Query(() => [RecognitionType])
  getRecognitions() {
    return this.leaderService.getRecognitions();
  }

  // Mutation to add a new recognition
  @Mutation(() => RecognitionType)
  addRecognition(
    @Args('input', { type: () => RecognitionInput }) input: RecognitionInput
  ) {
    return this.leaderService.addRecognition(input);
  }

  // Mutation to update recognition by ID
  @Mutation(() => RecognitionType)
  updateRecognition(
    @Args('id', { type: () => Int }) id: number,
    @Args('input', { type: () => RecognitionInput }) input: RecognitionInput
  ) {
    return this.leaderService.updateRecognition(id, input);
  }

  // Mutation to delete recognition by ID
  @Mutation(() => Boolean)
  deleteRecognition(
    @Args('id', { type: () => Int }) id: number
  ) {
    return this.leaderService.deleteRecognition(id);
  }
}
