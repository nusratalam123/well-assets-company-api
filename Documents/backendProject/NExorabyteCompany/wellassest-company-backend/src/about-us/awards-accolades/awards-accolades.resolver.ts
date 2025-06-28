import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AwardsAccoladesService } from './awards-accolades.service';
import { AwardImageInput, AwardInfoInput } from './dto/award.input';
import { AwardImageType, AwardInfoType } from './types/award.type';

@Resolver()
export class AwardsAccoladesResolver {
  constructor(private readonly awardsAccoladesService: AwardsAccoladesService) {}
  @Query(() => AwardInfoType)
  getAwardInfo() {
    return this.awardsAccoladesService.getAwardInfo();
  }

  @Mutation(() => AwardInfoType)
  updateAwardInfo(@Args('input') input: AwardInfoInput) {
    return this.awardsAccoladesService.updateAwardInfo(input);
  }

  @Query(() => [AwardImageType])
  getAwardImages() {
    return this.awardsAccoladesService.getAwardImages();
  }

  @Mutation(() => [AwardImageType])
  updateAwardImages(
    @Args({ name: 'input', type: () => [AwardImageInput] }) input: AwardImageInput[],
  ) {
    return this.awardsAccoladesService.updateAwardImages(input);
  }

  // Add award image mutation
  @Mutation(() => AwardImageType)
  addAwardImage(@Args('input') input: AwardImageInput) {
    return this.awardsAccoladesService.addAwardImage(input);
  }

  // Delete award image mutation
  @Mutation(() => [AwardImageType])
  deleteAwardImage(  @Args('id', { type: () => Int }) id: number,
  ) {
    return this.awardsAccoladesService.deleteAwardImage(id);
  }

  // Update award image by ID
  @Mutation(() => AwardImageType)
  updateAwardImage(
     @Args('id', { type: () => Int }) id: number,
   
    @Args('input') input: AwardImageInput,
  ) {
    return this.awardsAccoladesService.updateAwardImage(id, input);
  }
}
